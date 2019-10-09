import { Branch } from "./getBranches";
import { ChildProcess } from "child_process";

interface File extends Branch {
    type: string;
}

interface Output {
    output: File[]
}

function getFilesTree(
    child: ChildProcess,
    cb: (error: string | null, output: Output | '') => void
) {
    let output = '';
    let error: null | string = null;

    if (child.stdout === null || child.stderr === null) {
        return cb('something is wrong with child process', '');
    }

    child.stdout.on('data', (data) => {
        output += data.toString();
    });
    child.stderr.on('data', (data) => {
        error = data.toString();
    });
    child.stdout.on('end', () => {
        let filesOutput: Array<File> = [];
        let files = output.split('\n');
        files = files.filter(item => item);
        files.forEach((file, i) => {
            const obj: File = { id: 0, name: '', type: '' };
            obj.name = file;
            obj.id = i;
            obj.type = (file.includes('.') || file.toUpperCase() === file) ? 'file' : 'dir';
            filesOutput.push(obj);
        });
        filesOutput = filesOutput.sort((a, b) => a.type.length - b.type.length);
        cb(error, { output: filesOutput });
    });
}

module.exports = getFilesTree;
