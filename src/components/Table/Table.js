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

const Table = ({ tableData: { head, body }, className, iconType }) => {
    return (
        <table className={cnTable({}, [className])}>
            <thead className={cnTable('Head')}>
            <tr className={cnTable('Row')}>
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
                        <tr className={cnTable('Row')} key={i}>
                            { name &&
                                <td className={cnTable('Cell')}>
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
                                <td className={cnTable('Cell')}>
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
                                <td className={cnTable('Cell')}>
                                    {message}
                                </td>
                            }
                            { committer &&
                            <td className={cnTable('Cell')}>
                                <User>{committer}</User>
                            </td>
                            }
                            { updated &&
                                <td className={cnTable('Cell')}>
                                    {updated}
                                </td>
                            }
                            <td className={cnTable('Arrow')}>
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
