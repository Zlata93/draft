const path = require('path');
const { expect } = require('chai');
const getDirectories = require('../../server/utils/getDirectories');
const getFilesTree = require('../../server/utils/getFilesTree');
const getBranches = require('../../server/utils/getBranches');
const getCommits = require('../../server/utils/getCommits');
const getString = require('../../server/utils/getString');

const child = {
    stdout: {
        on: () => {}
    },
    stderr: {
        on: () => {}
    },
};

describe('Получение списка директорий', function () {
    it('возвращает массив с именами директорий', async () => {
        const dirs = await getDirectories(path.resolve(__dirname, '../../client/src'));

        expect(dirs).to.deep.equal(['components', 'pages', 'store', 'utils']);
    });
});

describe('Получение списка коммитов', function () {
    let err = null;
    let commits = [];
    const cb = (error, result) => {
        if(error) {
            err = error;
        } else {
            commits = result;
        }
    };

    const onData = (event, cb) => {
        if (event === 'data') {
            cb('6fcebc9fceda723df5165129435d8656d3719e68 05-Oct-2019 22:43 Zlata Kotlova\n' +
                '5f5935b149f6086989caee4a9c9d22372b0a9800 05-Oct-2019 22:15 Zlata Kotlova\n' +
                '5f5935b149f6086989caee4a9c9d22372b0a9800 05-Oct-2019 22:15 Zlata Kotlova\n' +
                '0b13ce9ae279f56aa2199fca2bc859106a42c97e 05-Oct-2019 21:49 Zlata Kotlova');
        } else {
            cb();
        }
    };

    it('преобразовывает строку в объект с массивом коммитов', async () => {
        child.stdout.on = onData;
        getCommits(child, cb);
        expect(commits).to.deep.equal({
            output: [
                '6fcebc9fceda723df5165129435d8656d3719e68 05-Oct-2019 22:43 Zlata Kotlova',
                '5f5935b149f6086989caee4a9c9d22372b0a9800 05-Oct-2019 22:15 Zlata Kotlova',
                '5f5935b149f6086989caee4a9c9d22372b0a9800 05-Oct-2019 22:15 Zlata Kotlova',
                '0b13ce9ae279f56aa2199fca2bc859106a42c97e 05-Oct-2019 21:49 Zlata Kotlova'
            ]
        });
    });

    it('пагинация работает', async () => {
        child.stdout.on = onData;
        getCommits(child, cb, 2, 2);

        expect(commits).to.deep.equal({
            output: [
                '5f5935b149f6086989caee4a9c9d22372b0a9800 05-Oct-2019 22:15 Zlata Kotlova',
                '0b13ce9ae279f56aa2199fca2bc859106a42c97e 05-Oct-2019 21:49 Zlata Kotlova'
            ]
        });
    });
});

describe('Получение списка веток', function () {
    it('преобразовывает строку в объект с массивом объектов с именами и id веток', async () => {
        let err = null;
        let branches = [];
        const cb = (error, result) => {
            if(error) {
                err = error;
            } else {
                branches = result;
            }
        };

        child.stdout.on = (event, cb) => {
            if (event === 'data') {
                cb('editor\n  master\n  redux\n  server\n* tests\n');
            } else {
                cb();
            }
        };

        getBranches(child, cb);

        expect(branches).to.deep.equal({
            output: [
                { name: 'editor', id: 0 },
                { name: 'master', id: 1 },
                { name: 'redux', id: 2 },
                { name: 'server', id: 3 },
                { name: 'tests', id: 4 }
            ]
        });
    });
});

describe('Получение объекта со строкой', function () {
    let err = null;
    let diff = '';
    const cb = (error, result) => {
        if(error) {
            err = error;
        } else {
            diff = result;
        }
    };

    child.stdout.on = (event, cb) => {
        if (event === 'data') {
            cb('diff goes here');
        } else {
            cb();
        }
    };

    it('преобразовывает строку в объект с полем output', async () => {
        getString(child, cb);
        expect(diff).to.have.property('output');
    });

    it('поле output содержит непустую строку', async () => {
        getString(child, cb);
        expect(diff.output).to.be.a('string').that.is.not.empty;
    });
});

describe('Получение объекта с массивом файлов', function () {
    it('преобразовывает строку в объект с массивом объектов с полями name, type, id', async () => {
        let err = null;
        let files = '';
        const cb = (error, result) => {
            if(error) {
                err = error;
            } else {
                files = result;
            }
        };

        child.stdout.on = (event, cb) => {
            if (event === 'data') {
                cb('components\ntest.js\n');
            } else {
                cb();
            }
        };

        getFilesTree(child, cb);

        expect(files).to.deep.equal({
            output: [
                { name: 'components', id: 0, type: 'dir' },
                { name: 'test.js', id: 1, type: 'file' },
            ]
        });
    });
});
