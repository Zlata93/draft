import React from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@bem-react/classname';
import { compose } from '@bem-react/core';
import './BranchNav.scss';

import LinkPresenter from '../Link/Link';
import SelectPresenter from '../Select/Select';
import { withLinkColorDefault } from '../Link/_color/Link_color_default';
import { withSelectSizeL } from '../Select/_size/Select_size_l';

const cnBranchNav = cn('BranchNav');

const Link = compose(withLinkColorDefault)(LinkPresenter);
const Select = compose(withSelectSizeL)(SelectPresenter);

const BranchNav = ({ onSelect, lastCommit }) => {
    const branches = useSelector(state => state.branch).branches.map(branch => branch.name);
    const branch = useSelector(state => state.branch).branch;
    const repo = useSelector(state => state.repos).repo;
    let commitHash, date, time, committer = '';

    if (lastCommit) {
        const lastCommitArr = lastCommit.split(' ');
        commitHash = lastCommitArr[0].slice(0, 7);
        date = lastCommitArr[1].replace('-', ' ');
        time = lastCommitArr[2];
        committer = lastCommitArr.slice(3).join(' ');
    }

    return (
        <div className={cnBranchNav()}>
            <div className={cnBranchNav('Header')}>
                <div className={cnBranchNav('Name')}>{repo}</div>
                <Select
                    size='l'
                    type='branch'
                    className={cnBranchNav('Select', { color: 'secondary '})}
                    options={branches}
                    activeOption={branch}
                    onSelect={onSelect}
                />
            </div>
            <div className={cnBranchNav('Info')}>
                Last commit&nbsp;
                <Link
                    href="#"
                    className={cnBranchNav('Link')}
                    color='default'
                >
                    {commitHash}
                </Link> on&nbsp;
                <Link
                    href="#"
                    className={cnBranchNav('Link')}
                    color='default'
                >
                    {date}, {time}
                </Link> by <span className="User">{committer}</span>
            </div>
        </div>
    );
};

export default BranchNav;
