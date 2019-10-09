"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFilesTree(child, cb) {
    var output = '';
    var error = null;
    if (child.stdout === null || child.stderr === null) {
        return cb('something is wrong with child process', '');
    }
    child.stdout.on('data', function (data) {
        output += data.toString();
    });
    child.stderr.on('data', function (data) {
        error = data.toString();
    });
    child.stdout.on('end', function () {
        var filesOutput = [];
        var files = output.split('\n');
        files = files.filter(function (item) { return item; });
        files.forEach(function (file, i) {
            var obj = { id: 0, name: '', type: '' };
            obj.name = file;
            obj.id = i;
            obj.type = (file.includes('.') || file.toUpperCase() === file) ? 'file' : 'dir';
            filesOutput.push(obj);
        });
        filesOutput = filesOutput.sort(function (a, b) { return a.type.length - b.type.length; });
        cb(error, { output: filesOutput });
    });
}
module.exports = getFilesTree;
