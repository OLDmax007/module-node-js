const {createInterface} = require("node:readline/promises");


const func = async () => {

    const rlInstance = createInterface({
        input: process.stdin,
        output: process.stdout
    })


    const userName = await rlInstance.question('Enter your name');
    console.log(userName)

    process.exit(0);

}

void func()