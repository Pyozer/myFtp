import * as net from "net"
import messages from "./messages"
import { spawn } from "child_process"
import path from "path"
import Command from "./commands/base_cmd"
import userCommand from './commands/user'
import passCommand from './commands/pass'
import systCommand from './commands/syst'
import featCommand from './commands/feat'
import pwdCommand from './commands/pwd'
import typeCommand from './commands/type'
import epsvCommand from './commands/epsv'
import statCommand from './commands/stat'
import portCommand from './commands/port'
import eprtCommand from './commands/eprt'
import listCommand from './commands/list'
import cwdCommand from './commands/cwd'
import cdupCommand from './commands/cdup'
import storCommand from './commands/stor'
import retrCommand from './commands/retr'

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

  /**
   * Create data transfert socket
   */
  const dataTransfert = (
    onConnect?: (dataSocket: net.Socket, onDone: () => void) => void,
    onData?: (data: Buffer, onDone: () => void) => void,
    onEnd?: (onDone: () => void) => void
  ) => {
    let dataSocket = net.createConnection(port, host)

    const done = () => {
      dataSocket.end()
      reply(226)
    }

    dataSocket.on('connect', () => {
      reply(150)
      if (onConnect) onConnect(dataSocket, done)
    }).on('data', data => {
      if (onData) onData(data, done)
    }).on('end', () => {
      if (onEnd) onEnd(done)
    })
  }

  socket.on("data", (data: Buffer) => {
    const command = data.toString().trim()
    console.log(command);

    let cmdExecuter: Command

    if (command.startsWith('USER ')) {
      cmdExecuter = userCommand
    } else if (command.startsWith('PASS ')) {
      cmdExecuter = passCommand
    } else if (command.startsWith('SYST')) {
      cmdExecuter = systCommand
    } else if (command.startsWith('FEAT')) {
      cmdExecuter = featCommand
    } else if (command.startsWith('PWD')) {
      cmdExecuter = pwdCommand
    } else if (command.startsWith('TYPE')) {
      cmdExecuter = typeCommand
    } else if (command.startsWith('EPSV')) {
      cmdExecuter = epsvCommand
    } else if (command.startsWith('STAT')) {
      cmdExecuter = statCommand
    } else if (command.startsWith('PORT')) {
      cmdExecuter = portCommand
    } else if (command.startsWith('EPRT')) {
      cmdExecuter = eprtCommand
    } else if (command.startsWith('LIST')) {
      cmdExecuter = listCommand
    } else if (command.startsWith('CWD')) {
      cmdExecuter = cwdCommand
    } else if (command.startsWith('CDUP')) {
      cmdExecuter = cdupCommand
    } else if (command.startsWith('STOR')) {
      cmdExecuter = storCommand
    } else if (command.startsWith('RETR')) {
      cmdExecuter = retrCommand
    }

    if (cmdExecuter)
      cmdExecuter.run(command, socket, reply)
  })

  reply(220) // Welcome response

  socket.on("end", () => socket.end())
})

server.on("error", (err: Error) => { throw err })

server.listen(PORT, () => {
  console.log("Opened server on:", server.address())
})
