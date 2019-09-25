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

To access to FTP server, you need to login, with FileZilla you can choose Anonymous login (anonymous:anonymous@example.com)
Or with FTP Client (CLI), you can login with user "root" and password "admin" using command `USER root` and `PASS admin`.

Commands availables:

- `USER <user>`
- `PASS <password>`
- `PWD`
- `CWD <newPath>` (you can do `CWD /root/path` or `CWD ..`)
- `CDUP`
- `TYPE [A|I]`
- `EPRT |[1|2]|<host>|<port>|` (ex: `EPRT |2|::|65432|`)
- `PORT h1,h2,h3,h4,p1,p2` (ex: `PORT 10,3,1,146,282,267`)
- `EPSV` (supported for FileZilla)
- `SYST` (supported for FileZilla)
- `FEAT` (supported for FileZilla)
- `LIST`
- `STOR <filename>`
- `RETR <filename>`
