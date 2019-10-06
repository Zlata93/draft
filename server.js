const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/repos', require('./server/routes/api/repos'));

// @route    GET *
// @desc     Любой несуществующий маршрут
// @access   Public
app.get('*', (req, res) => res.status(404).json({ error: ' 404: Страница не найдена' }));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));