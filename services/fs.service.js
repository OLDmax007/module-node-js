const {join: createPath} = require("node:path");
const fs = require('node:fs/promises')

const filePath = createPath(process.cwd(), 'db', 'usersData.json');
module.exports={
    readFile: async () => {
        try {
            const data = await fs.readFile(filePath, 'utf-8')
            return JSON.parse(data)
        } catch (e) {
            console.log(e.message)
        }
     },
    writeFile: async (data) => {
        try {
            await fs.writeFile(filePath,    JSON.stringify(data))
        } catch (e) {
            console.log(e.message)
        }
    }
}