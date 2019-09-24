import Command from './base_cmd'

export default new Command('TYPE', true, (arg, socketInfo) => {
    if ((arg === 'A' || arg === 'I')) {
        if (arg === 'A')
            socketInfo.setAsciiEncoding()
        else
            socketInfo.setBinaryEncoding()
        socketInfo.reply(200)
    } else {
        socketInfo.reply(501)
    }
});