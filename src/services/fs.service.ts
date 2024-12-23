import {join as createPath} from 'node:path';
import {IUser} from '../models/IUser'
import fs from 'node:fs/promises'

const filePath = createPath(process.cwd(), 'db', 'usersData.json');

const readFile = async ():Promise<IUser[]> => {
    try {
        const data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (e) {
        console.log(e.message)
    }
}

const writeFile = async (data:IUser[]):Promise<void> => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data))
    } catch (e) {
        console.log(e.message)
    }
}

export  {readFile, writeFile}