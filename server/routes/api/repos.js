"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var _a = require('child_process'), exec = _a.exec, spawn = _a.spawn;
var getDirectories = require('../../utils/getDirectories');
var getFilesTree = require('../../utils/getFilesTree');
var getBranches = require('../../utils/getBranches');
var getCommits = require('../../utils/getCommits');
var getString = require('../../utils/getString');
var pathToRepos = require('../../utils/pathToRepos');
// @route    GET api/repos
// @desc     Возвращает массив репозиториев, которые имеются в папке
// @access   Public
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getDirectories(pathToRepos)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
// @route    GET /api/repos/:repositoryId/commits/:commitHash
// @desc     Возвращает массив коммитов в данной ветке (или хэше коммита) вместе с датами их создания
// @access   Public
router.get('/:repositoryId/commits/:commitHash', function (req, res) {
    var _a = req.params, repositoryId = _a.repositoryId, commitHash = _a.commitHash;
    var _b = req.query, page = _b.page, limit = _b.limit;
    page = page && parseInt(page, 10);
    limit = limit && parseInt(limit, 10);
    try {
        var child = spawn('git', ['log', "" + commitHash, '--pretty=format:%H %cd %cN', '--date=format:%d-%b-%Y %H:%M'], { cwd: pathToRepos + "/" + repositoryId });
        getCommits(child, function (error, commits) {
            if (error) {
                res.send({ error: error });
            }
            else {
                res.send(commits);
            }
        }, page, limit);
    }
    catch (e) {
        console.error(e);
    }
});
// @route    GET /api/repos/:repositoryId/branches/:branch
// @desc     Возвращает массив веток репозитория
// @access   Public
router.get('/:repositoryId/branches', function (req, res) {
    var repositoryId = req.params.repositoryId;
    try {
        var child = spawn('git', ['branch'], { cwd: pathToRepos + "/" + repositoryId });
        getBranches(child, function (error, branches) {
            if (error) {
                res.send({ error: error });
            }
            else {
                res.send(branches);
            }
        });
    }
    catch (e) {
        console.error(e);
    }
});
// @route    GET /api/repos/:repositoryId/commits/:commitHash/diff
// @desc     Возвращает diff коммита в виде строки
// @access   Public
router.get('/:repositoryId/commits/:commitHash/diff', function (req, res) {
    var _a = req.params, repositoryId = _a.repositoryId, commitHash = _a.commitHash;
    try {
        var child = spawn('git', ['diff', "" + commitHash, commitHash + "~"], { cwd: pathToRepos + "/" + repositoryId });
        getString(child, function (error, diff) {
            if (error) {
                res.send({ error: error });
            }
            else {
                res.send(diff);
            }
        });
    }
    catch (e) {
        console.error(e);
    }
});
// @route    GET /api/repos/:repositoryId(/tree/:commitHash/:path)
// @desc     Возвращает содержимое репозитория по названию ветки (или хэшу комита).
//           Параметр repositoryId - название репозитория (оно же - имя папки репозитория).
//           То, что в скобках - опционально, если отсутствует и branchName, и path -
//           отдать актуальное содержимое в корне в главной ветке репозитория.
// @access   Public
router.get(['/:repositoryId/tree/:commitHash/:path([^/]*)', '/:repositoryId', '/:repositoryId/tree/:commitHash'], function (req, res) {
    var _a = req.params, repositoryId = _a.repositoryId, _b = _a.commitHash, commitHash = _b === void 0 ? 'master' : _b, path = _a.path;
    try {
        var child = spawn('git', ['ls-tree', '--name-only', "" + commitHash], { cwd: pathToRepos + "/" + repositoryId + "/" + (path ? path : '') });
        getFilesTree(child, function (error, files) {
            if (error) {
                res.send({ error: error });
            }
            else {
                res.send(files);
            }
        });
    }
    catch (e) {
        console.error(e);
    }
});
// @route    GET /api/repos/:repositoryId/blob/:commitHash/:pathToFile
// @desc     Возвращает содержимое конкретного файла, находящегося по пути pathToFile в ветке
//           (или по хэшу коммита) branchName. С используемой памятью должно быть все в порядке.
// @access   Public
router.get('/:repositoryId/blob/:commitHash/:pathToFile([^/]*)', function (req, res) {
    var _a = req.params, repositoryId = _a.repositoryId, commitHash = _a.commitHash, pathToFile = _a.pathToFile;
    try {
        var child = spawn('git', ['show', commitHash + "~:" + pathToFile], { cwd: pathToRepos + "/" + repositoryId });
        getString(child, function (error, file) {
            if (error) {
                res.send({ error: error });
            }
            else {
                res.send(file);
            }
        });
    }
    catch (e) {
        console.error(e);
    }
});
// @route    DELETE /api/repos/:repositoryId
// @desc     Безвозвратно удаляет репозиторий
// @access   Public
router.delete('/:repositoryId', function (req, res) {
    var repositoryId = req.params.repositoryId;
    exec("cd " + pathToRepos + " && rm -rf " + repositoryId, function (err) {
        if (err) {
            exec("cd " + pathToRepos + " && rmdir /s /q " + repositoryId, function (error) {
                if (error) {
                    res.send({ error: error });
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
router.post('/:repositoryId', function (req, res) {
    var repositoryId = req.params.repositoryId;
    var url = req.body.url;
    exec("cd " + pathToRepos + " && git clone " + url + " " + repositoryId, function (error) {
        if (error) {
            res.send({ error: error });
        }
        res.send({ msg: 'Successfully added!' });
    });
});
module.exports = router;
