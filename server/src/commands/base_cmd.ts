import SocketInfo from '../socket_info'

type Execute = (arg: string, socketInfo: SocketInfo) => void

class Command {
    pattern: string
    execute: Execute
    needAuth: boolean

    constructor(pattern: string, needAuth: boolean, execute: Execute) {
        this.pattern = pattern
        this.needAuth = needAuth
        this.execute = execute
    }

    run(command: string, socketInfo: SocketInfo) {
        this.execute(command.replace(this.pattern, '').trim(), socketInfo)
    }

    isMatch(command: string): boolean {
        return (command.trim() + ' ').startsWith(this.pattern + ' ')
    }
}

export default Command
