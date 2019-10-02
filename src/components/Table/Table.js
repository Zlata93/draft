import React from 'react';
import { cn } from '@bem-react/classname';
import { compose } from '@bem-react/core';
import './Table.scss';

import User from '../User/User';
import LinkPresenter from '../Link/Link';
import IconPlusPresenter from '../IconPlus/IconPlus';
import { withIconPlusWeightBold } from '../IconPlus/_weight/IconPlus_weight_bold';
import { withLinkColorDefault } from '../Link/_color/Link_color_default';

export const cnTable = cn('Table');
const Link = compose(withLinkColorDefault)(LinkPresenter);
const IconPlus = compose(withIconPlusWeightBold)(IconPlusPresenter);

const Table = ({ tableData: { head, body }, className = '', iconType }) => {
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
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default Table;
