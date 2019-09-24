import Command from './base_cmd'
import users from '../data/users'

export default new Command('PASS', false, (arg, socketInfo) => {
    if (!socketInfo.user) {
        socketInfo.reply(332)
        return
    }

    const userIndex = users.findIndex(user => user.user === socketInfo.user)
    if (userIndex >= 0 && users[userIndex].password == arg) {
        socketInfo.isPassOk = true
        socketInfo.reply(230)
    } else {
        socketInfo.isPassOk = false
        socketInfo.reply(430)
    }

})
