function getCommits(child, cb, page, limit) {
    let output = '';
    let error = null;

    child.stdout.on('data', (data) => {
        output += data.toString();
    });
    child.stderr.on('data', (data) => {
        error = data.toString();
    });
    child.stdout.on('end', () => {
        output = output.split('\n');
        if (page && limit && output.length) {
            const skip = (page - 1) * limit;
            output = output.slice(skip, skip+limit);
        }
        cb(error, { output });
    });
}

module.exports = getCommits;
