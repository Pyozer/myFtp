import path from 'path';
import { spawn } from "child_process";

export const addToPath = (currPath: string, pathArg: string) => {
    if (path.isAbsolute(pathArg)) {
        return path.join(pathArg);
    } else {
        return path.join(currPath, pathArg);
    }
}

export const listFiles = (path: string, encoding: string, callback: (result?: string) => void) => {
    let ls = spawn('ls', ['-l', path])
    let result = ''
    ls.stdout.setEncoding(encoding)
    ls.stdout.on('data', chunk => {
        result += chunk.toString()
    })
    ls.on('exit', code => {
        if (code != 0) {
            callback()
        } else {
            const lines = result.split('\n')
            callback(lines.slice(1, lines.length).join('\r\n'))
        }
    })
}