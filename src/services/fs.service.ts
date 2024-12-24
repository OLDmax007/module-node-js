import fs from "node:fs/promises";
import path from "node:path";

const { join: createPath } = path;

const filePath = createPath(process.cwd(), "db", "usersData.json");

const readFile = async (): Promise<any> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.log(e.message);
  }
};

const writeFile = async (data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data));
  } catch (e) {
    console.log(e.message);
  }
};

export { readFile, writeFile };
