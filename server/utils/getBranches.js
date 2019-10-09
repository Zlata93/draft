"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBranches(child, cb) {
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
        var branchOutput = [];
        var branches = output.replace('*', '').split('\n');
        branches.forEach(function (branch, i) {
            if (branch) {
                var obj = { id: 0, name: '' };
                obj.name = branch.trim();
                obj.id = i;
                branchOutput.push(obj);
            }
        });
        cb(error, { output: branchOutput });
    });
}
module.exports = getBranches;
