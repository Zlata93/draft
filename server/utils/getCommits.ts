import { ChildProcess } from "child_process";

export interface CommitsOutput {
    output: string[] | string
}

function getCommits(
    child: ChildProcess,
    cb: (error: string | null, output: CommitsOutput) => void,
    page: number | undefined,
    limit: number | undefined
) {
    let output = '';
    let error: null | string = null;

    if (child.stdout === null || child.stderr === null) {
        return cb('something is wrong with child process', { output });
    }

    child.stdout.on('data', (data) => {
        output += data.toString();
    });
    child.stderr.on('data', (data) => {
        error = data.toString();
    });
    child.stdout.on('end', () => {
        let outputArr = output.split('\n');
        if (page && limit && outputArr.length) {
            const skip = (page - 1) * limit;
            outputArr = outputArr.slice(skip, skip+limit);
        }
        cb(error, { output: outputArr });
    });
}

module.exports = getCommits;
