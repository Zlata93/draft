const express = require('express');
const router = express.Router();
const { exec, spawn } = require('child_process');
import { Request, Response } from 'express';
const getDirectories = require('../../utils/getDirectories');
const getFilesTree = require('../../utils/getFilesTree');
const getBranches = require('../../utils/getBranches');
const getCommits = require('../../utils/getCommits');
const getString = require('../../utils/getString');
const pathToRepos = require('../../utils/pathToRepos');

import { FilesOutput } from "../../utils/getFilesTree";
import { StringOutput} from "../../utils/getString";
import { CommitsOutput } from "../../utils/getCommits";
import { BranchesOutput} from "../../utils/getBranches";

// @route    GET api/repos
// @desc     Возвращает массив репозиториев, которые имеются в папке
// @access   Public
router.get('/', async (req: Request, res: Response) => {
    const result = await getDirectories(pathToRepos);
    res.send(result);
});

// @route    GET /api/repos/:repositoryId/commits/:commitHash
// @desc     Возвращает массив коммитов в данной ветке (или хэше коммита) вместе с датами их создания
// @access   Public
router.get('/:repositoryId/commits/:commitHash', (req: Request, res: Response) => {
    const { repositoryId, commitHash } = req.params;
    let { page, limit } = req.query;
    page = page && parseInt(page, 10);
    limit = limit && parseInt(limit, 10);

    try {
        const child = spawn(
            'git',
            ['log', `${commitHash}`, '--pretty=format:%H %cd %cN', '--date=format:%d-%b-%Y %H:%M'],
            { cwd: `${pathToRepos}/${repositoryId}` });

        getCommits(child, (error: string | null, commits: CommitsOutput) => {
            if(error) {
                res.send({ error })
            } else {
                res.send(commits);
            }
        }, page, limit);
    } catch (e) {
        console.error(e);
    }
});

// @route    GET /api/repos/:repositoryId/branches/:branch
// @desc     Возвращает массив веток репозитория
// @access   Public
router.get('/:repositoryId/branches', (req: Request, res: Response) => {
    const { repositoryId } = req.params;

    try {
        const child = spawn(
            'git',
            ['branch'],
            { cwd: `${pathToRepos}/${repositoryId}` });

        getBranches(child, (error: string | null, branches: BranchesOutput) => {
            if(error) {
                res.send({ error });
            } else {
                res.send(branches);
            }
        });
    } catch (e) {
        console.error(e);
    }
});

// @route    GET /api/repos/:repositoryId/commits/:commitHash/diff
// @desc     Возвращает diff коммита в виде строки
// @access   Public
router.get('/:repositoryId/commits/:commitHash/diff', (req: Request, res: Response) => {
    const { repositoryId, commitHash } = req.params;

    try {
        const child = spawn(
            'git',
            ['diff', `${commitHash}`, `${commitHash}~`],
            { cwd: `${pathToRepos}/${repositoryId}` });

        getString(child, (error: string | null, diff: StringOutput) => {
            if(error) {
                res.send({ error });
            } else {
                res.send(diff);
            }
        });
    } catch (e) {
        console.error(e);
    }
});

// @route    GET /api/repos/:repositoryId(/tree/:commitHash/:path)
// @desc     Возвращает содержимое репозитория по названию ветки (или хэшу комита).
//           Параметр repositoryId - название репозитория (оно же - имя папки репозитория).
//           То, что в скобках - опционально, если отсутствует и branchName, и path -
//           отдать актуальное содержимое в корне в главной ветке репозитория.
// @access   Public
router.get(
    ['/:repositoryId/tree/:commitHash/:path([^/]*)', '/:repositoryId', '/:repositoryId/tree/:commitHash'],
    (req: Request, res: Response) => {
    const { repositoryId, commitHash = 'master', path } = req.params;
    try {
        const child = spawn(
            'git',
            ['ls-tree', '--name-only', `${commitHash}`],
            { cwd: `${pathToRepos}/${repositoryId}/${path ? path : ''}` });

        getFilesTree(child, (error: string | null, files: FilesOutput) => {
            if(error) {
                res.send({ error });
            } else {
                res.send(files);
            }
        });
    } catch (e) {
        console.error(e);
    }
});

// @route    GET /api/repos/:repositoryId/blob/:commitHash/:pathToFile
// @desc     Возвращает содержимое конкретного файла, находящегося по пути pathToFile в ветке
//           (или по хэшу коммита) branchName. С используемой памятью должно быть все в порядке.
// @access   Public
router.get('/:repositoryId/blob/:commitHash/:pathToFile([^/]*)', (req: Request, res: Response) => {
    const { repositoryId, commitHash, pathToFile } = req.params;

    try {
        const child = spawn(
            'git',
            ['show', `${commitHash}~:${pathToFile}`],
            { cwd: `${pathToRepos}/${repositoryId}` });

        getString(child, (error: string | null, file: StringOutput) => {
            if(error) {
                res.send({ error });
            } else {
                res.send(file);
            }
        });
    } catch (e) {
        console.error(e);
    }
});

// @route    DELETE /api/repos/:repositoryId
// @desc     Безвозвратно удаляет репозиторий
// @access   Public
router.delete('/:repositoryId', (req: Request, res: Response) => {
    const { repositoryId } = req.params;
    exec(`cd ${pathToRepos} && rm -rf ${repositoryId}`, (err: string) => {
        if (err) {
            exec(`cd ${pathToRepos} && rmdir /s /q ${repositoryId}`, (error: string) => {
                if (error) {
                    res.send({ error });
                }
                res.send({ msg: 'Successfully deleted!' });
            });
        }
    });
});

// @route    POST /api/repos/:repositoryId + { url: ‘repo-url’ }
// @desc     Добавляет репозиторий в список, скачивает его по переданной в теле запроса
//           ссылке и добавляет в папку со всеми репозиториями.
// @access   Public
router.post('/:repositoryId', (req: Request, res: Response) => {
    const { repositoryId } = req.params;
    const { url } = req.body;
    exec(`cd ${pathToRepos} && git clone ${url} ${repositoryId}`, (error: string) => {
        if (error) {
            res.send({ error });
        }
        res.send({ msg: 'Successfully added!' });
    });
});

module.exports = router;

