import fs from 'fs'
import path from 'path'
import Command from './base_cmd'

export default new Command('RETR', true, (arg, socketInfo) => {
    let readStream = fs.createReadStream(
        path.join(socketInfo.currPath, arg)
    );

    socketInfo.dataTransfert((dataSocket, done) => {
        readStream.on('data', (chunk: Buffer) => dataSocket.write(chunk))
        readStream.on('close', done)
    })
})