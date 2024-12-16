const fs = require("node:fs/promises");
const path = require("node:path");

const func = async () => {

    await fs.writeFile('text.txt', 'hELLO PES');
    await fs.appendFile(path.join(process.cwd(), 'text.txt'), '\nALOO');
    const textResult = await fs.readFile(path.join(process.cwd(), 'text.txt'), 'utf-8');
    console.log(textResult)


    await fs.writeFile('someData.json', JSON.stringify({
        users: [
            {name: 'maks'},
            {name: 'pesik'},
            {name: 'laink'},
        ]
    }))

    const someDataResult = await fs.readFile(path.join(process.cwd(), 'someData.json'), 'utf-8')
    console.log(JSON.parse(someDataResult).users[0].name)


    // fs.appendFile(path.join(process.cwd(), 'someData.json'), JSON.stringify({pets: []}))
    // const someDataResultNew = await fs.readFile(path.join(process.cwd(), 'someData.json'), 'utf-8')
    // console.log(someDataResultNew)
    await fs.rename(path.join(process.cwd(), 'someData.json'),
        path.join(process.cwd(), 'files', 'someData.json'))


    await fs.copyFile(path.join(process.cwd(), 'files', 'someData.json'), path.join(process.cwd(), 'files', 'someData3.json'))

    await fs.mkdir(path.join(process.cwd(), 'data', 'logs'), {recursive: true}) // create dir
    // await fs.rm(path.join(process.cwd(), 'data', 'logs', 'aaa.html')) // remove file or dir
    // await fs.rmdir(path.join(process.cwd(), 'data', 'logs')) // remove only empty dir
    // await fs.rm(path.join(process.cwd(), 'data'), {recursive: true, force: true}) // remove even fulled dir
    // await fs.unlink(path.join(process.cwd(), 'data', 'asasa.js')) // also remove file
    const stat = await fs.stat(path.join(process.cwd())) // some info about file or dir
    console.log('\n' + stat.isFile())

}
void func()
