# MyFtp

MyFTP is a FTP project at school, to learn FTP protocol and Sockets using NodeJS.

Project contains :

- FTP Server (NodeJS)
- FTP Client CLI (NodeJS)
- FTP Client GUI (React / Electron) not finished

You can run FTP Server by using one of these :

- Quickly: `yarn dev` (PORT 4321 will be used)
- Or `yarn build && node . PORT`

You can run FTP Client CLI by using one of these:

- Quickly: `yarn dev`
- Or by using `yarn build` first and `node . HOST PORT` after (exemple `node . localhost 4321`).

FTP Server follow RFCs protocol, so you can use FileZilla (all commands are not implemented, like rename, delete, ..)
