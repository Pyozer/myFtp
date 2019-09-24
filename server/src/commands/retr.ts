import fs from 'fs'
import path from 'path'
import Command from './base_cmd'

export default new Command('RETR', true, (arg, socketInfo) => {
    let fileContent: string = fs.readFileSync(
        path.join(socketInfo.currPath, arg)
    ).toString();

    socketInfo.dataTransfert((dataSocket, done) => {
        dataSocket.write(fileContent)
        done()
    })
})