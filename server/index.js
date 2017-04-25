// require('import-export');
// require('babel-core/register')({presets: ['es2015', 'react']});

// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const express = require('express');
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');

// const renderToString = ReactDOMServer.renderToString;

// const staticFiles = [
//     '/static',
//     '/asset-manifest.json',
//     '/favicon.ico'
// ];

// const app = express();

// app.server = http.createServer(app);
// app.use(express.static('../build'));

// staticFiles.forEach(file => {
//     app.get(file, (req, res) => {
//         const filePath = path.join(__dirname, '../build', req.url);
//         res.sendFile( filePath );
//     });
// });

// app.get('*', (req, res) => {

//     const error = () => res.status(404).send('404');
    
//     const htmlFilePath = path.join(__dirname, '../build', 'index.html')

//     fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
//         console.log(htmlData)
//         if(err) {
//             error();
//         } else if (htmlData) {
//             const ReactApp = renderToString(React.createElement(htmlData));
//             const RenderApp = htmlData.replace(ReactApp);
//             res.status(200).send(RenderApp);
//         }
//     });
// });

const express = require('express');
const app = express();

app.use(express.static('build'));
app.set('views', './build');

app.get('*', function (req, res) {
    res.sendfile(`${process.cwd()}/build/index.html`);
});

app.listen(process.env.PORT || 8080);