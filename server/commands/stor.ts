import Command from "./base_cmd"
import fs from 'fs'
import path from 'path'

export default new Command('STOR', (arg, socket, reply) => {
    let writeStream = fs.createWriteStream(path.join(pwd, arg));

    dataTransfert(null, (data, done) => {
        writeStream.write(data)
        done()
    })
});