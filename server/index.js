const express = require('express');
const app = express();

app.use(express.static('build'));
app.set('views', './build');

app.get('*', function (req, res) {
    res.sendfile(`${process.cwd()}/build/index.html`);
});

app.listen(process.env.PORT || 8080);