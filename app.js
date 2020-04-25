const http = require('http')
const fs = require('fs')
const url = require('url');
const path = require('path');

const port = 7701

// const server = http.createServer((req, res) => {
// //     res.writeHead(200, {'Content-Type': 'text/html'})
// //
// //     fs.readFile('index.html', (error, data) => {
// //         if (error) {
// //             res.writeHead(404)
// //             res.write('Page not found')
// //         } else {
// //             res.write(data)
// //         }
// //         res.end()
// //     })
// // })

const server = http.createServer(function(request, response) {
    const pathname = url.parse(request.url).pathname;
    const ext = path.extname(pathname);
    if(ext){
        if(ext === '.css'){
            response.writeHead(200, {'Content-Type': 'text/css'});
        }
    else if(ext === '.js'){
            response.writeHead(200, {'Content-Type': 'text/javascript'});
        }
        response.write(fs.readFileSync(__dirname + pathname, 'utf8'));
    }
    else{
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(fs.readFileSync('index.html', 'utf8'));
    }
    response.end();
})

server.listen(port, (error) => {
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on', port)
    }
})