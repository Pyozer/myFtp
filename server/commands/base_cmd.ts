import { Socket } from 'net'

type Reply = (status: number, message?: string, callback?: (err?: Error) => void) => void

type Execute = (arg: string, socket: Socket, reply: Reply) => void

class Command {
    pattern: string
    execute: Execute

    constructor(pattern: string, execute: Execute) {
        this.pattern = pattern
        this.execute = execute
    }

    run(command: string, socket: Socket, reply: Reply) {
        this.execute(command.replace(this.pattern, '').trim(), socket, reply)
    }

    isMatch(command: string): boolean {
        return command.trim().startsWith(this.pattern)
    }
}

export default Command
