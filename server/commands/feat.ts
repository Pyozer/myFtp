import Command from "./base_cmd"

export default new Command('FEAT', (arg, socket, reply) => {
    socket.write('211-Extensions supported\r\n')
    reply(211, 'End')
});
