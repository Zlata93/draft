import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { cnBreadcrumbs } from '../Breadcrumbs';
import './Breadcrumbs-Item.scss'

interface BreadcrumbsItemProps {
    i: number;
    crumb: string;
    crumbs: string[]
}

const BreadcrumbsItem: FC<BreadcrumbsItemProps> = ({ crumb, i, crumbs }) => {
    const path = [...crumbs.slice(0, i + 1)].join("/").replace('root', '');
    if (i === 1) {
        return <li key={path} className={cnBreadcrumbs('Item')}>{crumb}</li>
    }
    return (
        <li className={cnBreadcrumbs('Item')}>
            <Link key={path} to={path === '/root' ? '/' : path}>
                {crumb}
            </Link>
        </li>
    );
};

export default BreadcrumbsItem;
