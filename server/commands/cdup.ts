import path from 'path';
import Command from "./base_cmd"

export default new Command('CDUP', (arg, socket, reply) => {
    pwd = path.resolve(pwd, '../')
    reply(250, 'Directory changed to "' + pwd + '"')
});