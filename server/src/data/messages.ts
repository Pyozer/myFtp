import { Messages, Message } from "../models/message";

/**
 * Standard messages for status (RFC 959)
 */
const messages: Messages = new Messages([
    new Message(110, 'Restart marker reply.'), // In this case, the text is exact and not left to the particular implementation; it must read: MARK yyyy = mmmm Where yyyy is User-process data stream marker, and mmmm server's equivalent marker (note the spaces between markers and '=').
    new Message(120, 'Service ready in %s minutes.'),
    new Message(125, 'Data connection already open; transfer starting.'),
    new Message(150, 'File status okay; about to open data connection.'),
    new Message(200, 'Command okay.'),
    new Message(202, 'Command not implemented, superfluous at this site.'),
    new Message(211, 'System status, or system help reply.'),
    new Message(212, 'Directory status.'),
    new Message(213, 'File status.'),
    new Message(214, 'Help message.'), // On how to use the server or the meaning of a particular non-standard command. This reply is useful only to the human user.
    new Message(220, 'Service ready for new user.'),
    new Message(221, 'Service closing control connection.'), // Logged out if appropriate.
    new Message(215, 'Node FTP featureless server.'), // NAME system type. Where NAME is an official system name from the list in the Assigned Numbers document.
    new Message(225, 'Data connection open; no transfer in progress.'),
    new Message(226, 'Closing data connection.'), // Requested file action successful (for example, file transfer or file abort).
    new Message(227, 'Entering Passive Mode.'), // (h1,h2,h3,h4,p1,p2).
    new Message(230, 'User logged in, proceed.'),
    new Message(250, 'Requested file action okay, completed.'),
    new Message(257, '\'%s\' created.'),
    new Message(331, 'User name okay, need password.'),
    new Message(332, 'Need account for login.'),
    new Message(350, 'Requested file action pending further information.'),
    new Message(421, 'Service not available, closing control connection.'), // This may be a reply to any command if the service knows it must shut down.
    new Message(425, 'Can\'t open data connection.'),
    new Message(426, 'Connection closed; transfer aborted.'),
    new Message(430, 'Identifiant ou mot de passe incorrect'),
    new Message(450, 'Requested file action not taken.'), // File unavailable (e.g., file busy).
    new Message(451, 'Requested action aborted. Local error in processing.'),
    new Message(452, 'Requested action not taken.'), // Insufficient storage space in system.
    new Message(500, 'Syntax error, command unrecognized.'), // This may include errors such as command line too long.
    new Message(501, 'Syntax error in parameters or arguments.'),
    new Message(502, 'Command not implemented.'),
    new Message(503, 'Bad sequence of commands.'),
    new Message(504, 'Command not implemented for that parameter.'),
    new Message(530, 'Not logged in.'),
    new Message(532, 'Need account for storing files.'),
    new Message(550, 'Requested action not taken.'), // File unavailable (e.g., file not found, no access).
    new Message(551, 'Requested action aborted. Page type unknown.'),
    new Message(552, 'Requested file action aborted.'), // Exceeded storage allocation (for current directory or dataset).
    new Message(553, 'Requested action not taken.'), // File name not allowed.
])

export default messages