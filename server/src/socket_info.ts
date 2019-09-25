import { Socket, createConnection } from 'net'
import messages from './data/messages'

const asciiEncoding = "utf8"
const binaryEncoding = "binary"

export default class SocketInfo {
    socket: Socket
    host: string
    port: number
    currPath: string
    user: string
    isPassOk: boolean = false
    private _dataEncoding: string

    constructor(socket: Socket, currPath: string) {
        this.socket = socket
        this.currPath = currPath
    }

    get isAuth(): boolean { return this.user != null && this.isPassOk }

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
        this.reply(150)
        let dataSocket = createConnection(this.port, this.host)
        dataSocket.setTimeout(0)

        const done = () => {
            dataSocket.end()
        }

        dataSocket.on('connect', () => {
            if (onConnect) onConnect(dataSocket, done)
        }).on('data', data => {
            console.log(data);

            if (onData) onData(data, done)
        }).on('end', () => {
            if (onEnd) onEnd(done)
            this.reply(226)
        })
    }
}