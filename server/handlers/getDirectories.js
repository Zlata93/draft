const fs = require('fs');
const util = require('util');

/**
* Возвращает массив имен директорий по заданному пути
*
* @param  {string} pathToRepos - путь до директории с репозиториями
* @return {undefined} - функция ничего не возвращает
*
*/
async function getDirectories (pathToRepos) {
    const dirs = await util.promisify(fs.readdir)(pathToRepos);
    const repos = [];
    for (let dir of dirs) {
        const stats = await util.promisify(fs.stat)(pathToRepos);
        if (stats.isDirectory()) {
            repos.push(dir)
        }
    }
    return repos
}

module.exports = getDirectories;