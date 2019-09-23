import * as net from "net"
import fs from 'fs'
import messages from "./messages"
import { spawn } from "child_process"
import { join } from "path"

const PORT = !process.argv[2] ? 4321 : parseInt(process.argv[2])
const dataEncoding = "binary"
const asciiEncoding = "utf8"
let passive = false
let queue = []

const listFiles = (callback: (result?: string) => void) => {
  let ls = spawn('ls', ['-l', __dirname])
  let result = ''
  // ls.stdout.setEncoding(self.encoding)
  ls.stdout.on('data', (chunk) => {
    result += chunk.toString()
  })
  ls.on('exit', code => {
    if (code != 0) {
      callback()
    } else {
      const lines = result.split('\n')
      callback(lines.slice(1, lines.length).join('\r\n'))
    }
  })
}

const server = net.createServer((socket) => {
  let host: string;
  let port: number;

  /**
   * Configure client connection info
   */
  socket.setTimeout(0)
  socket.setNoDelay()

  /**
   * Socket response shortcut
   */
  const reply = (status: number, message?: string, callback?: (err?: Error) => void) => {
    if (!message) message = messages.getMsg(status) || 'No information'
    if (socket.writable) {
      socket.write(status + ' ' + message + '\r\n', callback)
    }
  }

  const dataTransfert = (data: string) => {
    let dataSocket = net.createConnection(port, host)
    dataSocket.on('connect', () => {
      reply(150)
      dataSocket.write(data + '\r\n', () => dataSocket.end(() => reply(226)))
    })
  }

  socket.on("data", (data: Buffer) => {
    const command = data.toString()
    console.log(command);


    if (command.startsWith('USER '))
      reply(331)
    else if (command.startsWith('PASS '))
      reply(230)
    else if (command.startsWith('SYST'))
      reply(215)
    else if (command.startsWith('FEAT')) {
      socket.write('211-Extensions supported\r\n')
      // No feature
      reply(211, 'End')
    } else if (command.startsWith('PWD')) {
      reply(257, "/Users/podpak/Projects/myFtp")
    } else if (command.startsWith('TYPE ')) {
      const type = command.split(' ')[1].trim()
      reply((type === "A" || type === "I") ? 200 : 501)
    } else if (command.startsWith('EPSV')) {
      reply(202)
    } else if (command.startsWith('EPRT')) {
      const values = command.replace('EPRT |', '').split('|')
      host = values[1]
      port = parseInt(values[2])
      console.log(host, port);
      reply(202)

    } else if (command.startsWith('LIST')) {
      listFiles(dataTransfert)
    }
  })

  reply(220) // Welcome response

  socket.on("end", () => socket.end())
})

server.on("error", (err: Error) => { throw err })

server.listen(PORT, () => {
  console.log("Opened server on:", server.address())
})
