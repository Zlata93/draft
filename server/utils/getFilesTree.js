function getFilesTree(child, cb) {
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
        let filesOutput = [];
        let files = output.split('\n');
        files = files.filter(item => item);
        files.forEach((file, i) => {
            const obj = {};
            obj.name = file;
            obj.id = i;
            obj.type = (file.includes('.') || file.toUpperCase() === file) ? 'file' : 'dir';
            filesOutput.push(obj);
        });
        output = filesOutput.sort((a, b) => a.type.length - b.type.length);
        cb(null, { output });
    });
}

module.exports = getFilesTree;