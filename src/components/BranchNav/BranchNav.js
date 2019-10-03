import React from 'react';
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

const options = [
    {
        name: 'trunk',
        id: '1'
    },
    {
        name: 'develop',
        id: '2'
    },
    {
        name: 'my-feature-3',
        id: '3'
    },
    {
        name: 'my-feature-4',
        id: '4'
    },
    {
        name: 'my-feature-5',
        id: '5'
    },
    {
        name: 'users/a-aidyn00/my-feature-6',
        id: '6'
    }
];

const BranchNav = ({ branchName, onSelect }) => {
    return (
        <div className={cnBranchNav()}>
            <div className={cnBranchNav('Header')}>
                <div className={cnBranchNav('Name')}>arcadia</div>
                <Select
                    size='l'
                    type='branch'
                    className={cnBranchNav('Select', { color: 'secondary '})}
                    options={options}
                    activeOption={branchName}
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
                    c4d248
                </Link> on&nbsp;
                <Link
                    href="#"
                    className={cnBranchNav('Link')}
                    color='default'
                >
                    20 Oct 2017, 12:24
                </Link> by <span className="User">robot-srch-releaser</span>
            </div>
        </div>
    );
};

export default BranchNav;
