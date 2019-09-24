import Command from './base_cmd'

export default new Command('EPSV', true, (arg, socketInfo) => {
    socketInfo.reply(229)
});