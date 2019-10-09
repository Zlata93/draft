"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getString(child, cb) {
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
        cb(error, { output: output });
    });
}
module.exports = getString;
