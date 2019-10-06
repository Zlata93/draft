const fs = require('fs');
const pathToRepos = require('./pathToRepos');

/**
 * Создает дочерний процесс, используя spawn
 *
 * @param  {object} req - http request
 * @param  {object} res - http response
 * @param  {function} next - функция обратного вызова
 * @return {undefined} - функция ничего не возвращает
 *
 */
function getDirContent(req, res, next) {
    fs.readdir(pathToRepos, { withFileTypes: true }, (err, data) => {
        if (err) {
            res.locals.err = err;
            next();
        }
        res.locals.files = data
            .filter(dir => dir.isDirectory())
            .map(dir => dir.name);
        next();
    });
}

module.exports = getDirContent;