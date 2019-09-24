import path from 'path';
import Command from './base_cmd'

export default new Command('CDUP', (arg, socketInfo) => {
    socketInfo.currPath = path.resolve(socketInfo.currPath, '../')
    socketInfo.reply(250, `Directory changed to "${socketInfo.currPath}"`)
});