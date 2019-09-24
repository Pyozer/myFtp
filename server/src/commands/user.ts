import Command from './base_cmd'
import users from '../data/users'

export default new Command('USER', false, (arg, socketInfo) => {
    const userIndex = users.findIndex(user => user.user === arg)
    if (userIndex >= 0) {
        socketInfo.user = users[userIndex].user
        socketInfo.reply(331)
    } else {
        socketInfo.user = null
        socketInfo.reply(430)
    }
})
