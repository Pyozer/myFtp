import * as net from "net"
import messages from "./messages"
import { handleRequest } from './commands/handle_request';


const PORT = !process.argv[2] ? 4321 : parseInt(process.argv[2])
export const asciiEncoding = "utf8"
export const binaryEncoding = "binary"

export class SocketInfo {
  socket: net.Socket
  host: string
  port: number
  currPath: string
  dataEncoding: string

  constructor(socket: net.Socket, currPath: string) {
    this.socket = socket
    this.currPath = currPath
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
    onConnect?: (dataSocket: net.Socket, onDone: () => void) => void,
    onData?: (data: Buffer, onDone: () => void) => void,
    onEnd?: (onDone: () => void) => void
  ) {
    let dataSocket = net.createConnection(this.port, this.host)

    const done = () => {
      dataSocket.end()
      this.reply(226)
    }

    dataSocket.on('connect', () => {
      this.reply(150)
      if (onConnect) onConnect(dataSocket, done)
    }).on('data', data => {
      if (onData) onData(data, done)
    }).on('end', () => {
      if (onEnd) onEnd(done)
    })
  }
}

const server = net.createServer((socket) => {
  let socketInfo = new SocketInfo(socket, process.cwd())

  /**
   * Configure client connection info
   */
  socket.setTimeout(0)
  socket.setNoDelay()

  socket.on("data", (data: Buffer) => {
    const command = data.toString().trim()
    handleRequest(command, socketInfo)
  })

  socketInfo.reply(220) // Welcome response

  socket.on("end", () => socket.end())
})

server.on("error", (err: Error) => { throw err })

server.listen(PORT, () => {
  console.log("Opened server on:", server.address())
})
