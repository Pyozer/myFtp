import { createWriteStream, readFileSync } from "fs"
import * as net from "net"

if (process.argv.length < 4) { throw new Error("You must provide host and port in arguments !") }

const HOST = process.argv[2]
const PORT = parseInt(process.argv[3], 10)
let isSkipRes = 0

const openDataServer = (
  onServerUp?: () => void,
  onClientConnect?: (dataClient: net.Socket, onDone: () => void) => void,
  onClientData?: (dataClient: net.Socket, data: string, onDone: () => void) => void,
  onClientEnd?: () => void,
) => {
  const done = () => {
    server.close()
  }

  const server = net.createServer((dataClient: net.Socket) => {
    if (onClientConnect) {
      onClientConnect(dataClient, () => {
        dataClient.end()
        done()
      })
    }

    dataClient.on("data", (data: Buffer) => {
      console.log(data.toString())

      if (onClientData) {
        onClientData(dataClient, data.toString(), () => {
          dataClient.end()
          done()
        })
      }
    })

    dataClient.on("end", () => {
      if (onClientEnd) { onClientEnd() }
      done()
    })
  })

  server.listen(() => {
    const address = server.address() as net.AddressInfo
    isSkipRes = 2
    client.write(`EPRT |${address.family === "IPv6" ? 2 : 1}|${address.address}|${address.port}\r\n`)
    client.once("data", (_) => {
      if (onServerUp) { onServerUp() }
    })
  })
}

const client = net.createConnection(PORT, HOST, () => {
  console.log(`Connected to FTP Server "${HOST}:${PORT}"`)
})

client.on("error", (err: Error) => { throw err })
client.on("end", (err: Error) => { throw new Error("Server disconnected :/") })

client.on("data", (data: Buffer) => {
  const response = data.toString().trim()
  console.log(`Response: ${response}`)

  const respCode = parseInt(response.substring(0, 3), 10)

  if (isSkipRes > 0) { isSkipRes-- }
  if (isSkipRes === 0 && respCode !== 150) {
    process.stdout.write("\nCommand: ")
  }
})

process.openStdin().addListener("data", (stdin) => {
  const input = `${stdin}`.trim()

  if (input === "LIST") {
    openDataServer(
      () => { client.write("LIST\r\n") },
      null,
      (_, __, onDone) => {
        onDone()
      },
    )
  } else if (input.startsWith("STOR ")) {
    const fileName = input.split(" ")[1]

    const fileContent = readFileSync(fileName).toString()

    openDataServer(
      () => { client.write(input + "\r\n") },
      (dataClient, onDone) => {
        console.log(`Sending ${fileName} to server...`)

        dataClient.write(fileContent, onDone)
        dataClient.end()
      },
    )
  } else if (input.startsWith("RETR ")) {
    const fileName = input.split(" ")[1]

    const writeStream = createWriteStream(fileName)

    openDataServer(
      () => { client.write(input + "\r\n") },
      null,
      (_, data, __) => { writeStream.write(data) },
      () => { writeStream.end() }
    )
  } else {
    client.write(input + "\r\n")
  }
})
