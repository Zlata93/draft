const assert = require('assert');

describe('Главная страница', () => {
    hermione.skip.in('firefox', 'ломается с ошибкой OffsetViewportError: Can not capture the specified region of the viewport.');
    it('успешно загрузилась', function () {
        return this.browser
            .url('/')
            .isExisting('.MainPage')
            .then(exists => {
                assert.ok(exists, 'Главная страница загрузилась')
            })
            .assertView('plain', 'body');
    });
});

describe('Страница с содержимым репозитория', () => {
    hermione.skip.in('firefox', 'ломается с ошибкой OffsetViewportError: Can not capture the specified region of the viewport.');
    it('успешно загрузилась', function () {
        return this.browser
            .url('/test_repo/master')
            .isExisting('.Table')
            .then(exists => {
                assert.ok(exists, 'Страница с содержимым репозитория загрузилась')
            })
            .assertView('plain', 'body');
    });
});

describe('Страница с содержимым файла', () => {
    hermione.skip.in('firefox', 'ломается с ошибкой OffsetViewportError: Can not capture the specified region of the viewport.');
    it('успешно загрузилась', function () {
        return this.browser
            .url('/test_repo/master/src/test.js')
            .isExisting('.Editor')
            .then(exists => {
                assert.ok(exists, 'Страница с содержимым файла загрузилась')
            })
            .assertView('plain', 'body');
    });
});

describe('Правильно работают переходы по страницам', () => {
    it('переход из списка файлов во вложенную папку', function () {
        let fileName;
        let file;
        return this.browser
            .url('/test_repo/master')
            .element('.IconPlus')
            .then((files) => {
                file = files[0];
                return file;
            })
            .getText('.IconPlus')
            .then((name) => {
                fileName = name[0];
                return file;
            })
            .click('.IconPlus')
            .getUrl()
            .then((path) => {
                assert.equal(path, `http://localhost:3000/test_repo/master/${fileName}`);
            });
    });

    it('переход из списка файлов на страницу отдельного файла', function () {
        let fileName;
        let file;
        return this.browser
            .url('/test_repo/master/src')
            .element('.IconPlus')
            .then((files) => {
                file = files[0];
                return file;
            })
            .getText('.IconPlus')
            .then((name) => {
                fileName = name;
                return file;
            })
            .click('.IconPlus')
            .getUrl()
            .then((path) => {
                assert.equal(path, `http://localhost:3000/test_repo/master/src/${fileName}`);
            });
    });
});

describe('Правильно работают переходы по хлебным крошкам', () => {
    it('переход из файла в рутовую директорию', function () {
        return this.browser
            .url('/test_repo/master/src/test.js')
            .click('.Breadcrumbs-Item:first-child a')
            .getUrl()
            .then((path) => {
                assert.equal(path, `http://localhost:3000/`);
            });
    });

    it('переход из файла в предыдущую директорию', function () {
        return this.browser
            .url('/test_repo/master/src/test.js')
            .click('.Breadcrumbs-Item:nth-last-child(2) a')
            .getUrl()
            .then((path) => {
                assert.equal(path, `http://localhost:3000/test_repo/master/src`);
            });
    });

    it('переход из вложенной директории в предыдущую директорию', function () {
        return this.browser
            .url('/test_repo/master/src')
            .click('.Breadcrumbs-Item:nth-last-child(2) a')
            .getUrl()
            .then((path) => {
                assert.equal(path, `http://localhost:3000/test_repo/master`);
            });
    });
});