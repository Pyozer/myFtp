import Command from "./base_cmd"

export default new Command('EPRT', (arg, socket, reply) => {
    const values = arg.split('|')
    //TODO: Update global variable
    host = values[1]
    port = parseInt(values[2])
    reply(200)
});