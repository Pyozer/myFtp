import { Socket, createConnection } from 'net'
import messages from './messages'

const asciiEncoding = "utf8"
const binaryEncoding = "binary"

export default class SocketInfo {
    socket: Socket
    host: string
    port: number
    currPath: string
    private _dataEncoding: string

    constructor(socket: Socket, currPath: string) {
        this.socket = socket
        this.currPath = currPath
    }

    get dataEncoding(): string { return this._dataEncoding }

    setBinaryEncoding() {
        this._dataEncoding = binaryEncoding
    }

    setAsciiEncoding() {
        this._dataEncoding = asciiEncoding
    }

    /**
     * Socket response shortcut
     */
    reply(status: number, message?: string, callback?: (err?: Error) => void) {
        if (!message) message = messages.getMsg(status) || 'No information'
        if (this.socket.writable) {
            this.socket.write(status + ' ' + message + '\r\n', callback)
        }
        console.log("RESPONSE: " + status + ' ' + message + '\r\n');
    }

    /**
     * Create data transfert socket
     */
    dataTransfert(
        onConnect?: (dataSocket: Socket, onDone: () => void) => void,
        onData?: (data: Buffer, onDone: () => void) => void,
        onEnd?: (onDone: () => void) => void
    ) {
        let dataSocket = createConnection(this.port, this.host)

        const done = () => {
            dataSocket.end()
        }

        dataSocket.on('connect', () => {
            this.reply(150, null, () => {
                if (onConnect) onConnect(dataSocket, done)
            })
        }).on('data', data => {
            if (onData) onData(data, done)
        }).on('end', () => {
            if (onEnd) onEnd(done)
            this.reply(226)
        })
    }
}