import React from 'react';
import { cn } from '@bem-react/classname';
import { compose } from '@bem-react/core';
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
const Link = compose(withLinkColorDefault)(LinkPresenter);
const Arrow = compose(withArrowStateRight, withArrowColorFaded, withArrowSizeL)(ArrowPresenter);
const IconPlus = compose(withIconPlusWeightBold)(IconPlusPresenter);

const Table = ({ tableData: { head, body }, className, iconType, tableType }) => {
    console.log(tableType)
    return (
        <table className={cnTable({}, [className])}>
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
            <tbody className={cnTable('Body')}>
                {
                    body.map(({ name, commit, message, committer, updated }, i) =>
                        <tr className={cnTable('Row', { type: tableType })} key={i}>
                            { name &&
                                <td className={cnTable('Cell', { type: 'name' })}>
                                    <IconPlus
                                        weight='bold'
                                        type={iconType}
                                        className={cnTable('Icon')}
                                    >
                                        {name}
                                    </IconPlus>
                                </td>
                            }
                            { commit &&
                                <td className={cnTable('Cell', { type: 'commit' })}>
                                    <Link
                                        color='default'
                                        href="#"
                                        className={cnTable('Link')}
                                    >
                                        {commit}
                                    </Link>
                                </td>
                            }
                            { message &&
                                <td className={cnTable('Cell', { type: 'message' })}>
                                    {message}
                                </td>
                            }
                            { committer &&
                            <td className={cnTable('Cell', { type: 'committer' })}>
                                <User>{committer}</User>
                            </td>
                            }
                            { updated &&
                                <td className={cnTable('Cell', { type: 'updated' })}>
                                    {updated}
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
                    )
                }
            </tbody>
        </table>
    );
};

export default Table;
