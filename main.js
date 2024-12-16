const {createServer: server} = require('http');

server((req, res) => {
    // console.log(req)
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    console.log(res.statusCode)
    console.log(res.messageerror)

    if (req.url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        console.log(res.statusCode)
        console.log(res.messageerror)
        res.end('Home page');

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        console.log(res.statusCode)
        console.log(res.messageerror)
        res.end('Not found page');
    }
}).listen(3333, () => {
    console.log('http://localhost:3333/home')
    console.log('http://localhost:3333');
});
