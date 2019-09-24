import Command from './base_cmd'

export default new Command('PWD', true, (arg, socketInfo) => {
    socketInfo.reply(257, socketInfo.currPath)
});