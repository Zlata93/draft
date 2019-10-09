import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import BreadcrumbsItem from './-Item/Breadcrumbs-Item';
import './Breadcrumbs.scss';

export const cnBreadcrumbs = cn('Breadcrumbs');

const Breadcrumbs: FC<{}> = () => <Route path="*" render={({ location }) => {
    let crumbs = location.pathname.split("/");
    crumbs = crumbs.filter(part => part);
    if (!crumbs.includes('root')) {
        crumbs.unshift('root')
    }
    const place = crumbs[crumbs.length - 1];
    crumbs = crumbs.slice();
    crumbs = crumbs.slice(0, crumbs.length - 1);
    return (
        <ul className={cnBreadcrumbs()}>
            {crumbs.map((crumb, i, crumbs) => <BreadcrumbsItem key={i} crumb={crumb} i={i} crumbs={crumbs}/>)}
            <li className={cnBreadcrumbs('Item', {state: 'active'})}>{place}</li>
        </ul>
    );
}}/>;

export default Breadcrumbs;
