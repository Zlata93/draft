function getString(child, cb) {
    let output = '';
    let error = null;

    child.stdout.on('data', (data) => {
        output += data.toString();
    });
    child.stderr.on('data', (data) => {
        error = data.toString();
        cb(error);
    });
    child.stdout.on('end', () => {
        cb(null, { output });
    });
}

module.exports = getString;