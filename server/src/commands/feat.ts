import Command from "./base_cmd"

export default new Command('FEAT', (arg, socketInfo) => {
    socketInfo.socket.write('211-Extensions supported\r\n')
    socketInfo.reply(211, 'End')
});
