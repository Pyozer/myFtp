import Command from "./base_cmd"

export default new Command('TYPE', (arg, socket, reply) => {
    if ((arg === "A" || arg === "I")) {
        dataEncoding = arg === "A" ? asciiEncoding : binaryEncoding // TODO: Use global variables
        reply(200)
    } else {
        reply(501)
    }
});