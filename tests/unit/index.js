const path = require('path');
const { expect } = require('chai');
const getDirectories = require('../../server/utils/getDirectories');
const getCommits = require('../../server/handlers/getCommits');

const child = {
    stdout: {
        on: () => {}
    },
    stderr: {
        on: (event, cb) => {
            cb('error');
        }
    },
};

describe('Получение списка директорий', function () {
    it('возвращает массив с именами директорий', async () => {
        const dirs = await getDirectories(path.resolve(__dirname, '../../client/src'));

        expect(dirs).to.deep.equal(['components', 'pages', 'store', 'utils']);
    });
});

describe('Получение списка коммитов', function () {
    it('возвращает массив с коммитами', async () => {
        let err = null;
        let commits = [];
        const cb = (error, result) => {
            if(error) {
                err = error;
            } else {
                commits = result;
            }
        };

        child.stdout.on = (event, cb) => {
            if (event === 'data') {
                cb('6fcebc9fceda723df5165129435d8656d3719e68 05-Oct-2019 22:43 Zlata Kotlova\n5f5935b149f6086989caee4a9c9d22372b0a9800 05-Oct-2019 22:15 Zlata Kotlova\n0b13ce9ae279f56aa2199fca2bc859106a42c97e 05-Oct-2019 21:49 Zlata Kotlova');
            } else {
                cb();
            }
        };

        getCommits(child, cb);

        expect(commits).to.deep.equal({
            output: [
                '6fcebc9fceda723df5165129435d8656d3719e68 05-Oct-2019 22:43 Zlata Kotlova',
                '5f5935b149f6086989caee4a9c9d22372b0a9800 05-Oct-2019 22:15 Zlata Kotlova',
                '0b13ce9ae279f56aa2199fca2bc859106a42c97e 05-Oct-2019 21:49 Zlata Kotlova'
            ]
        });
    });
});