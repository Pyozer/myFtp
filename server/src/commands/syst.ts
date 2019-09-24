import Command from './base_cmd'

export default new Command('SYST', (arg, socketInfo) => {
    socketInfo.reply(215)
})
