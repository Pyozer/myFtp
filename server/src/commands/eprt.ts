import Command from './base_cmd'

export default new Command('EPRT', true, (arg, socketInfo) => {
    const values = arg.split('|') // Format: |<number>|<host>|<port>|
    
    socketInfo.host = values[2]
    socketInfo.port = parseInt(values[3])
    socketInfo.reply(200)
});