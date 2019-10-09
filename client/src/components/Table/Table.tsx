import React, { FC } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { compose } from '@bem-react/core';
import { Branch } from "../../store/branch/branch.types";
import getPathFromLocation from '../../utils/getPathFromLocation';
import './Table.scss';

import User from '../User/User';
import LinkPresenter from '../Link/Link';
import ArrowPresenter from '../Arrow/Arrow';
import IconPlusPresenter from '../IconPlus/IconPlus';
import { withIconPlusWeightBold } from '../IconPlus/_weight/IconPlus_weight_bold';
import { withLinkColorDefault } from '../Link/_color/Link_color_default';
import { withArrowStateRight } from '../Arrow/_state/Arrow_state_right';
import { withArrowColorFaded } from '../Arrow/_color/Arrow_color_faded';
import { withArrowSizeL } from '../Arrow/_size/Arrow_size_l';

export const cnTable = cn('Table');
const MyLink = compose(withLinkColorDefault)(LinkPresenter);
const Arrow = compose(withArrowStateRight, withArrowColorFaded, withArrowSizeL)(ArrowPresenter);
const IconPlus = compose(withIconPlusWeightBold)(IconPlusPresenter);

export interface TableBodyItem extends Branch {
    type: string;
    commit?: string;
    message?: string;
    updated?: string;
    committer?: string;
}

export interface TableData {
    head: string[];
    body: Array<TableBodyItem | Branch>;
    // body: TableBodyItem[] | Branch[] | [];
    type: string;
}

export interface TableProps extends RouteComponentProps {
    tableData: TableData;
    tableType: string;
    iconType: string;
    className?: string;
}

const Table: FC<TableProps> = ({ tableData: { head, body }, className, iconType, tableType, location }) => {

    return (
        <table className={cnTable({}, [className])}>
            { head &&
            <thead className={cnTable('Head')}>
                <tr className={cnTable('Row',)}>
                    {
                        head.map((item, i) =>
                            <th
                                key={i}
                                className={cnTable('Cell', { type: 'head '})}
                            >
                                {item}
                            </th>
                        )
                    }
                </tr>
            </thead>
            }
            <tbody className={cnTable('Body')}>
                {
                    body.length === 0 ?
                        <tr>
                            <td className={cnTable('Cell', { type: 'name' })}>
                                Not a git repository
                            </td>
                        </tr> :
                        // body.map((item: Branch |TableBodyItem) => {
                        body.map(({ name, id, type }) => {
                        let path = getPathFromLocation(location.pathname);

                        return (
                            <tr className={cnTable('Row', { type: tableType })} key={id}>
                                { name &&
                                <td className={cnTable('Cell', { type: 'name' })}>
                                    <Link
                                        to={{
                                            pathname: `${path}/${name}`,
                                            state: { type }
                                        }}
                                    >
                                        <IconPlus
                                            weight='bold'
                                            type={iconType === 'dir' ? type : iconType}
                                            className={cnTable('Icon')}
                                        >
                                            {name}
                                        </IconPlus>
                                    </Link>
                                </td>
                                }
                                <td className={cnTable('Cell', { type: 'arrow' })}>
                                    <Arrow
                                        state='right'
                                        color='faded'
                                        size='l'
                                    />
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
};

export default withRouter(Table);
