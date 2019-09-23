import fs from 'fs'
import path from 'path'
import Command from "./base_cmd"

export default new Command('RETR', (arg, socket, reply) => {
    let fileContent: string = fs.readFileSync(path.join(pwd, arg)).toString();

    dataTransfert((dataSocket, done) => {
        dataSocket.write(fileContent)
        done()
    })
})