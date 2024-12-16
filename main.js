const { createServer: server } = require('node:http');

const func = async () => {
    server((req, res) => {

        switch (req.url) {
            case '/users':
                switch (req.method) {
                    case 'GET':
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ data: 'Users' }));
                        return;
                    default:
                        res.writeHead(405, { 'Content-Type': 'text/plain' });
                        res.end('Method Not Allowed');
                        return;
                }

            case '/posts': switch (req.method) {
                case 'GET':
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({data: 'Posts'}))
                    return;
                default:
                    res.writeHead(405, { 'Content-Type': 'text/plain' })
                    res.end('Method Not Allowed');
                    return;
            }
            default:
                res.writeHead(400, { 'Content-Type': 'text/plain' })
                res.end('Page not found')
        }

    }).listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
};

void func();
