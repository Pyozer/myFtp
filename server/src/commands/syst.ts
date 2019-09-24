import Command from './base_cmd'

export default new Command('SYST', true, (arg, socketInfo) => {
    socketInfo.reply(215)
})
