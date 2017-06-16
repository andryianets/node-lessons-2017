const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const p = (func) => (...args) => {
    return new Promise((resolve, reject) => {
        func(...args, (err, ...params) => {
            if (err) {
                reject(err);
            } else {
                resolve(...params);
            }
        });
    });
};

const server = http.createServer((req, res) => {
    p(fs.readFile)(path.resolve(__dirname, 'data.txt'), 'utf-8')
        .then(data => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            const {from = 0, len} = url.parse(req.url, true).query;
            res.write(data.substr(from, len));
            res.end();
        })
        .catch(err => {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        })
});

server.listen(process.env.PORT || 3000, null, null, () => {
    console.log('Server started...');
});