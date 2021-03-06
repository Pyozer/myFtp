import fs from 'fs'
import path from 'path'
import Command from './base_cmd'

export default new Command('STOR', true, (arg, socketInfo) => {
    let writeStream = fs.createWriteStream(
        path.join(socketInfo.currPath, arg)
    );

    socketInfo.dataTransfert(
        null,
        data => {
            writeStream.write(data)
        },
        done => {
            writeStream.end()
            done()
        },
    )
});