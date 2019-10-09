"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCommits(child, cb, page, limit) {
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
        var outputArr = output.split('\n');
        if (page && limit && outputArr.length) {
            var skip = (page - 1) * limit;
            outputArr = outputArr.slice(skip, skip + limit);
        }
        cb(error, { output: outputArr });
    });
}
module.exports = getCommits;
