import Command from "./base_cmd"
import { listFiles } from "../fs_util"

export default new Command('LIST', (arg, socketInfo) => {
    listFiles(socketInfo.currPath, socketInfo.dataEncoding, files => {
        socketInfo.dataTransfert((dataSocket, done) => {
            dataSocket.write(files + '\r\n')
            done()
        })
    })
});