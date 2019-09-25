import { createConnection, createServer, AddressInfo, Socket } from 'net'
import { readFileSync, createWriteStream } from 'fs';

if (process.argv.length < 4) throw "You must provide host and port in arguments !"

const HOST = process.argv[2]
const PORT = parseInt(process.argv[3])
let isSkipRes = 0;

const openDataServer = (
  onServerUp: (onDone: () => void) => void,
  onClientConnect: (dataClient: Socket, onDone: () => void) => void,
  onClientData: (dataClient: Socket, data: String, onDone: () => void) => void,
  onClientEnd: () => void,
) => {
  const done = () => {
    server.close()
  }

  let server = createServer(dataClient => {
    onClientConnect(dataClient, () => {
      dataClient.end()
      done()
    })

    dataClient.on('data', (data: Buffer) => {
      console.log(data.toString());
      
      onClientData(dataClient, data.toString(), () => {
        dataClient.end()
        done()
      })
    })

    dataClient.on('end', () => {
      onClientEnd()
      done()
    })
  })

  server.listen(() => {
    let address = server.address() as AddressInfo
    isSkipRes = 2
    client.write(`EPRT |${address.family === 'IPv6' ? 2 : 1}|${address.address}|${address.port}\r\n`)
    client.once('data', _ => { onServerUp(done) })
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

  const respCode = parseInt(response.substring(0, 3))

  if (isSkipRes > 0) isSkipRes--
  if (isSkipRes == 0 && respCode != 150) {
    process.stdout.write("\nCommand: ")
  }
})

process.openStdin().addListener("data", (data) => {
  const input: string = `${data}`.trim()

  if (input === 'LIST') {
    openDataServer(
      (onDone) => { client.write("LIST\r\n") },
      (onDone) => { },
      (dataClient, data, onDone) => {
        onDone()
      },
      () => { }
    )
  } else if (input.startsWith('STOR ')) {
    const fileName = input.split(' ')[1];

    let fileContent = readFileSync(fileName).toString()

    openDataServer(
      (onDone) => { client.write(data) },
      (dataClient, onDone) => {
        console.log(`Sending ${fileName} to server...`);

        dataClient.write(fileContent, onDone)
        dataClient.end()
      },
      (dataClient, data, onDone) => { },

      () => { }
    )
  } else if (input.startsWith('RETR ')) {
    const fileName = input.split(' ')[1];

    let writeStream = createWriteStream(fileName)

    openDataServer(
      (onDone) => { client.write(data) },
      (dataClient, onDone) => { },
      (dataClient, data, onDone) => { writeStream.write(data) },
      () => { writeStream.end() }
    )
  } else {
    client.write(data)
  }
})
