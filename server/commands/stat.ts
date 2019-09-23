import Command from "./base_cmd"

export default new Command('STAT', (arg, socket, reply) => {
    reply(202)
});