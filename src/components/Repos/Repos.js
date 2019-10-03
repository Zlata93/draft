import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../Table/Table';
import { cnHomePage } from '../../pages/HomePage/HomePage';

const Repos = ({branchName}) => {
    const repos = useSelector(state => state.repos).repos;
    const reposObj = {
        head: ['Directories'],
        body: []
    };
    repos.forEach((repo, i) => {
        const obj = {};
        obj.id = i;
        obj.name = repo;
        reposObj.body.push(obj);
    });
    return (
        <div>
            <Table
                className={cnHomePage('Table')}
                tableData={reposObj}
                iconType='dir'
                tableType='repos'
                branchName={branchName}
            />
        </div>
    );
};

export default Repos;
