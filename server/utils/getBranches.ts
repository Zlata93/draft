import { ChildProcess } from "child_process";

export interface Branch {
    id: number;
    name: string;
}

export interface Error {
    error: string
}

interface Output {
    output: Branch[]
}

function getBranches(
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
        let branchOutput: Array<Branch> = [];
        let branches = output.replace('*', '').split('\n');
        branches.forEach((branch, i) => {
            if (branch) {
                const obj: Branch = { id: 0, name: ''};
                obj.name = branch.trim();
                obj.id = i;
                branchOutput.push(obj);
            }
        });
        cb(error, { output: branchOutput });
    });
}

module.exports = getBranches;
