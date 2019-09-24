import Command from "./base_cmd"
import { addToPath } from "../fs_util"

export default new Command('CWD', (arg, socketInfo) => {
    socketInfo.currPath = addToPath(socketInfo.currPath, arg)
    socketInfo.reply(250, `Directory changed to ${socketInfo.currPath}`)
});