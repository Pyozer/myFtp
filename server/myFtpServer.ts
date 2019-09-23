import * as net from "net"
import messages from "./messages"
import { spawn } from "child_process"
import path from "path"
import fs from 'fs'

const PORT = !process.argv[2] ? 4321 : parseInt(process.argv[2])
const asciiEncoding = "utf8"
const binaryEncoding = "binary"
let dataEncoding = binaryEncoding
let pwd = process.cwd()

const _resolvePath = (pathArg = '.') => {
  if (path.isAbsolute(pathArg)) {
    return path.join(pathArg);
  } else {
    return path.join(pwd, pathArg);
  }
}

const listFiles = (callback: (result?: string) => void) => {
  let ls = spawn('ls', ['-l', pwd])
  let result = ''
  ls.stdout.setEncoding(dataEncoding)
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
    console.log("RESPONSE: " + status + ' ' + message + '\r\n');
  }

  const dataTransfert = (data: string) => {
    let dataSocket = net.createConnection(port, host)
    dataSocket.on('connect', () => {
      reply(150)
      dataSocket.write(data + '\r\n', () => dataSocket.end(() => reply(226)))
    })
  }

  socket.on("data", (data: Buffer) => {
    const command = data.toString().trim()
    console.log(command);

    if (command.startsWith('USER ')) {
      reply(331)
    } else if (command.startsWith('PASS ')) {
      reply(230)
    } else if (command.startsWith('SYST')) {
      reply(215)
    } else if (command.startsWith('FEAT')) {
      socket.write('211-Extensions supported\r\n')
      reply(211, 'End')
    } else if (command.startsWith('PWD')) {
      reply(257, pwd)
    } else if (command.startsWith('TYPE')) {
      const type = command.split(' ')[1].trim()
      if ((type === "A" || type === "I")) {
        dataEncoding = type === "A" ? asciiEncoding : binaryEncoding
        reply(200)
      } else {
        reply(501)
      }
    } else if (command.startsWith('EPSV')) {
      reply(229)
    } else if (command.startsWith('STAT')) {
      reply(202)
    } else if (command.startsWith('PORT')) {
      reply(202)
    } else if (command.startsWith('EPRT')) {
      const values = command.replace('EPRT |', '').split('|')
      host = values[1]
      port = parseInt(values[2])
      reply(200)
    } else if (command.startsWith('LIST')) {
      listFiles(dataTransfert)
    } else if (command.startsWith('CWD')) {
      pwd = _resolvePath(command.split(' ')[1])
      reply(250, 'Directory changed to "' + pwd + '"')
    } else if (command.startsWith('CDUP')) {
      pwd = path.resolve(pwd, '../')
      reply(250, 'Directory changed to "' + pwd + '"')
    } else if (command.startsWith('STOR')) {
      const fileName = command.split(' ')[1]

      let writeStream = fs.createWriteStream(path.join(pwd, fileName));

      let dataSocket = net.createConnection(port, host)
      dataSocket.on('connect', () => {
        reply(150)
      }).on('data', data => {
        const fileContent = data.toString()
        writeStream.write(fileContent)
      }).on('end', () => {
        writeStream.end()
        reply(226)
      })
    } else if (command.startsWith('RETR')) {
      const fileName = command.split(' ')[1]

      let fileContent: string = fs.readFileSync(path.join(pwd, fileName)).toString();

      let dataSocket = net.createConnection(port, host)
      dataSocket.on('connect', () => {
        reply(150)
        dataSocket.write(fileContent, () => dataSocket.end(() => reply(226)))
      })
    }
  })

  reply(220) // Welcome response

  socket.on("end", () => socket.end())
})

server.on("error", (err: Error) => { throw err })

server.listen(PORT, () => {
  console.log("Opened server on:", server.address())
})
