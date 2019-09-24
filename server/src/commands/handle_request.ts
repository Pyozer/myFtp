import SocketInfo from '../socket_info'
import Command from './base_cmd'
import allCommands from './'

export const handleRequest = (command: string, socketInfo: SocketInfo) => {
    console.log(command)

    let cmdExecuter: Command

    for (let cmd of allCommands) {
        if (command.startsWith(cmd.pattern)) {
            cmdExecuter = cmd
            break;
        }
    }

    if (!cmdExecuter) socketInfo.reply(202)
    else cmdExecuter.run(command, socketInfo)
}