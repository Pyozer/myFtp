import Command from "./base_cmd"

export default new Command('USER', (arg, socketInfo) => {
    socketInfo.reply(331)
})
