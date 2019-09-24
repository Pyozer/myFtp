import Command from './base_cmd'

export default new Command('PASS', (arg, socketInfo) => {
    socketInfo.reply(230)
})
