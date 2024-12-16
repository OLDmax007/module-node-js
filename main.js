const {EventEmitter} = require('node:events')
const os = require("node:os");

// const userEmitter = new EventEmitter()
// userEmitter.on('enter_email', (email) => {
//     console.log(`You have entered ${email}`)
// })
// userEmitter.on('enter_data', (data) => {
//     console.log(`You have entered ${data}`)
// })
//
// userEmitter.emit('enter_email', 'aslsal@gassa.com')

// const userEmitter = new EventEmitter()
// userEmitter.on('enter_some_data', (data, time) => {
//     console.log(`You have entered ${data}`, time)
// })
// userEmitter.on('enter_some_data', (data, time) => {
//     console.log(`Your data are ${data}`, time)
// })
//
// userEmitter.emit('enter_some_data', 'Pes', '30:30:30')
//


// const userEmitter = new EventEmitter()
// userEmitter.once('enter_some_data', (data, time) => {
//     console.log(`You have entered ${data}`, time)
// })
// userEmitter.once('enter_some_data', (data, time) => {
//     console.log(`Your data are ${data}`, time)
// })
//
// userEmitter.emit('enter_some_data', 'Pes', '30:30:30')
// userEmitter.emit('enter_some_data', 'Pes', '30:30:30')
// userEmitter.emit('enter_some_data', 'Pes', '30:30:30')
//


console.log(os.platform());
console.log(os.totalmem())
console.log(os.version())
console.log(os.networkInterfaces())