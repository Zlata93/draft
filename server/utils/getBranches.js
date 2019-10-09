function getBranches(child, cb) {
    let output = '';
    let error = null;

    child.stdout.on('data', (data) => {
        output += data.toString();
    });
    child.stderr.on('data', (data) => {
        error = data.toString();
    });
    child.stdout.on('end', () => {
        let branchOutput = [];
        let branches = output.replace('*', '').split('\n');
        branches.forEach((branch, i) => {
            if (branch) {
                const obj = {};
                obj.name = branch.trim();
                obj.id = i;
                branchOutput.push(obj);
            }
        });
        output = branchOutput;
        cb(error, { output });
    });
}

module.exports = getBranches;
