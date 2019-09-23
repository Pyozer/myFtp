import Command from "./base_cmd"

export default new Command('SYST', (arg, socket, reply) => {
    reply(215)
})
