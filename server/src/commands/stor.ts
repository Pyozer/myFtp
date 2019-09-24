import fs from 'fs'
import path from 'path'
import Command from './base_cmd'

export default new Command('STOR', (arg, socketInfo) => {
    let writeStream = fs.createWriteStream(
        path.join(socketInfo.currPath, arg)
    );

    socketInfo.dataTransfert(null, (data, done) => {
        writeStream.write(data)
        done()
    })
});