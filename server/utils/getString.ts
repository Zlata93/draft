import { ChildProcess } from "child_process";

interface Output {
    output: string;
}

function getString(
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
        cb(error, { output });
    });
}

module.exports = getString;
