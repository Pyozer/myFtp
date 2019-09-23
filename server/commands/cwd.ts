import Command from "./base_cmd"

export default new Command('CWD', (arg, socket, reply) => {
    pwd = _resolvePath(arg)
    reply(250, 'Directory changed to "' + pwd + '"')
});