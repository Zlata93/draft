const fs = require('fs');
const util = require('util');

/**
* Возвращает массив имен директорий по заданному пути
*
* @param  {string} pathToRepos - путь до директории с репозиториями
* @return {undefined} - функция ничего не возвращает
*
*/
async function getDirectories (pathToRepos: string) {
    const dirs: string[] = await util.promisify(fs.readdir)(pathToRepos);
    return dirs.filter(f => !/\..*/g.test(f));
}

module.exports = getDirectories;
