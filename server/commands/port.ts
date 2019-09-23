import Command from "./base_cmd"

export default new Command('PORT', (arg, socket, reply) => {
    reply(202)
});