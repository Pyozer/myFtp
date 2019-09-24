import Command from "./base_cmd"

export default new Command('STAT', (arg, socketInfo) => {
    socketInfo.reply(202)
});