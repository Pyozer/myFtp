import { createConnection, createServer, AddressInfo, Socket } from 'net'

if (process.argv.length < 4) throw "You must provide host and port in arguments !"

const HOST = process.argv[2]
const PORT = parseInt(process.argv[3])
let isSkipRes = 0;

const openDataServer = (onConnect: () => void, onData: (data: String) => void) => {
  let server = createServer(dataClient => {
    dataClient.on('data', (data) => {
      onData(data.toString())
    })
  })
  server.listen(() => {
    let address = server.address() as AddressInfo
    isSkipRes = 2
    client.write(
      `EPRT |2|${address.address}|${address.port}\r\n`,
      () => setTimeout(onConnect, 100)
    )
  })
}

const client = createConnection(PORT, HOST, () => {
  console.log(`Connected to FTP Server "${HOST}:${PORT}"`);
})

client.on('error', (err: Error) => { throw err })
client.on('end', (err: Error) => { throw "Server disconnected :/" })

client.on('data', (data: Buffer) => {
  const response = data.toString().trim()
  console.log(`Response: ${response}`)

  if (isSkipRes == 0) {
    process.stdout.write("\nCommand: ")
  } else {
    isSkipRes--
  }
})

process.openStdin().addListener("data", (data) => {
  const input = data.toString().trim()

  console.log(`Your input: ${input}`)

  if (input == 'LIST') {
    openDataServer(
      () => { client.write("LIST\r\n") },
      (data) => { console.log(data) }
    )
  } else {
    client.write(data)
  }
})