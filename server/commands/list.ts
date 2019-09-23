import Command from "./base_cmd"

export default new Command('LIST', (arg, socket, reply) => {
    listFiles(files => {
        dataTransfert((dataSocket, done) => {
            dataSocket.write(files + '\r\n')
            done()
        })
    })
});