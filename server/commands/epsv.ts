import Command from "./base_cmd"

export default new Command('EPSV', (arg, socket, reply) => {
    reply(229)
});