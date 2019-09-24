import Command from './base_cmd'
import userCommand from './user'
import passCommand from './pass'
import systCommand from './syst'
import featCommand from './feat'
import pwdCommand from './pwd'
import typeCommand from './type'
import epsvCommand from './epsv'
import statCommand from './stat'
import portCommand from './port'
import eprtCommand from './eprt'
import listCommand from './list'
import cwdCommand from './cwd'
import cdupCommand from './cdup'
import storCommand from './stor'
import retrCommand from './retr'
import { SocketInfo } from '../myFtpServer'

export const handleRequest = (command: string, socketInfo: SocketInfo) => {
    console.log(command)

    let cmdExecuter: Command

    if (command.startsWith('USER ')) {
        cmdExecuter = userCommand
    } else if (command.startsWith('PASS ')) {
        cmdExecuter = passCommand
    } else if (command.startsWith('SYST')) {
        cmdExecuter = systCommand
    } else if (command.startsWith('FEAT')) {
        cmdExecuter = featCommand
    } else if (command.startsWith('PWD')) {
        cmdExecuter = pwdCommand
    } else if (command.startsWith('TYPE')) {
        cmdExecuter = typeCommand
    } else if (command.startsWith('EPSV')) {
        cmdExecuter = epsvCommand
    } else if (command.startsWith('STAT')) {
        cmdExecuter = statCommand
    } else if (command.startsWith('PORT')) {
        cmdExecuter = portCommand
    } else if (command.startsWith('EPRT')) {
        cmdExecuter = eprtCommand
    } else if (command.startsWith('LIST')) {
        cmdExecuter = listCommand
    } else if (command.startsWith('CWD')) {
        cmdExecuter = cwdCommand
    } else if (command.startsWith('CDUP')) {
        cmdExecuter = cdupCommand
    } else if (command.startsWith('STOR')) {
        cmdExecuter = storCommand
    } else if (command.startsWith('RETR')) {
        cmdExecuter = retrCommand
    }

    if (cmdExecuter)
        cmdExecuter.run(command, socketInfo)
}