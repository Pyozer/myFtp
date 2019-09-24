import Command from './base_cmd'

export default new Command('PORT', true, (arg, socketInfo) => {
    const v = arg.split(',') // Format: h1,h2,h3,h4,p1,p2
    
    socketInfo.host = `${v[0]}.${v[1]}.${v[2]}.${v[3]}`
    socketInfo.port = parseInt((parseInt(v[4]).toString(2) + parseInt(v[5]).toString(2)), 2)
    socketInfo.reply(200)
});