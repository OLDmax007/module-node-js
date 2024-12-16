const http = require('node:http')
const path = require('node:path')

const pathToUtils = path.join(__dirname, 'utils', 'utils.js')
const pathToUtilsExp =  path.join('/example', 'utils', 'utils.js')
console.log(pathToUtils)
console.log(path.basename(pathToUtils)) //  file
console.log(path.dirname(pathToUtils)) // the path to file without last file
console.log(path.extname(pathToUtils)) // file extension
console.log(path.parse(pathToUtils)) // full desc about a file
console.log(path.normalize(pathToUtilsExp)) // corrects the path
console.log(path.isAbsolute(pathToUtils)) // get started symbol '/'
console.log(path.isAbsolute(pathToUtilsExp))

