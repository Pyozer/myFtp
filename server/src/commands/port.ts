import Command from "./base_cmd"

export default new Command('PORT', (arg, socketInfo) => {
    socketInfo.reply(202)
});