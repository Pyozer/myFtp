import Command from "./base_cmd"

export default new Command('USER', (arg, socket, reply) => {
    reply(331)
})
