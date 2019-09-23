import Command from "./base_cmd"

export default new Command('PWD', (arg, socket, reply) => {
    reply(257, pwd) // TODO: Create global data
});