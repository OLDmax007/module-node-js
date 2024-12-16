const {join: createPath} = require("node:path");
const fs = require("node:fs/promises");

const func = async () => {
    await fs.mkdir(createPath(process.cwd(), 'data'), {recursive: true, force: true})

    const createDirectories = async (dirs) => {
        // dirs.map(async (dir) => {
        //     await fs.mkdir(createPath(process.cwd(), 'data', dir), {recursive: true});
        // })
        await Promise.all(dirs.map(async (dir) => {
            await fs.mkdir(createPath(process.cwd(), 'data', dir), {recursive: true});
        }))
    }


    const createFilesToDirs = async (dirs, files) => {
        for (let i = 0; i < dirs.length; i++) {
            const pathToDir = createPath(process.cwd(), 'data', dirs[i])
            await fs.writeFile(createPath(pathToDir, files[i] + '.json'), JSON.stringify({}), "utf-8")
        }
    }

    const identifyPaths = async (currentPath) => {
        const data = await fs.readdir(currentPath)
        for (const item of data) {
            const fullPath = createPath(currentPath, item)
            const statItem = await fs.stat(fullPath)
            if (statItem.isDirectory()) {
                console.log(fullPath, 'is directory');
                identifyPaths(fullPath)
            } else {
                console.log(fullPath, 'is file')
            }
        }
    };

    await  createDirectories(['dogs', 'cats', 'elephants', 'tigers', 'lions']);
    await  createFilesToDirs(['dogs', 'cats', 'elephants', 'tigers', 'lions'], ['dog', 'cat', 'elephant', 'tiger', 'lion']);

    await  identifyPaths(createPath(process.cwd(), 'data'));

}
void func()

