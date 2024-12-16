const path = require('node:path')
const fsCB = require('node:fs')


const readStream = fsCB.createReadStream(path.join(process.cwd(), 'conditional-clauses_5513.pdf'))
const writeStream = fsCB.createWriteStream(path.join(process.cwd(), 'files', 'conditionals.pdf'))
readStream.pipe(writeStream)
