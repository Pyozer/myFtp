import * as net from 'net'
import { handleRequest } from './commands/handle_request';
import SocketInfo from './socket_info';

const PORT = !process.argv[2] ? 4321 : parseInt(process.argv[2])

const server = net.createServer((socket) => {
  let socketInfo = new SocketInfo(socket, process.cwd())

  /**
   * Configure client connection info
   */
  socket.setTimeout(0)
  socket.setNoDelay()

  socket.on('data', (data: Buffer) => {
    handleRequest(data.toString().trim(), socketInfo)
  })

  socketInfo.reply(220) // Welcome response

  socket.on('end', () => socket.end())
})

server.on('error', (err: Error) => { throw err })

server.listen(PORT, () => {
  console.log('Opened server on:', server.address())
})
