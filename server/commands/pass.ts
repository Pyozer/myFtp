import Command from "./base_cmd"

export default new Command('PASS', (arg, socket, reply) => {
    reply(230)
})
