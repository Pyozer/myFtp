import Command from "./base_cmd"

export default new Command('EPSV', (arg, socketInfo) => {
    socketInfo.reply(229)
});