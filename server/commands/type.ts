import Command from "./base_cmd"
import { asciiEncoding, binaryEncoding } from "../myFtpServer"

export default new Command('TYPE', (arg, socketInfo) => {
    if ((arg === "A" || arg === "I")) {
        socketInfo.dataEncoding = arg === "A" ? asciiEncoding : binaryEncoding
        socketInfo.reply(200)
    } else {
        socketInfo.reply(501)
    }
});