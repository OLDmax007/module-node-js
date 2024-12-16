require('./utils/utils')
const {logWord, word} = require("./utils/utils");

console.log('don')
console.log('path: ', __dirname)
console.log('path: ', __filename)
console.log('current dic where I has been located: '  + process.cwd())

logWord(word)


const readLine = require('readline') // ability for input some data and output them
console.log(readLine)


const outputSomeData = () => {
    const rlInstance = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rlInstance.question('Input some data: ', (value) => {
        console.log(value)
        rlInstance.close()
    })
}

outputSomeData()