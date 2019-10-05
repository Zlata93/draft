import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { compose, composeU } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Select.scss'

// import { setRepo } from '../../store/repos/repos.actions';
// import { fetchFilesStartAsync } from '../../store/files/files.actions';

import { withArrowStateDown } from '../Arrow/_state/Arrow_state_down';
import { withArrowStateUp } from '../Arrow/_state/Arrow_state_up';
import ArrowPresenter from '../Arrow/Arrow';

export const cnSelect = cn('Select');

const Arrow = compose(composeU(withArrowStateUp, withArrowStateDown))(ArrowPresenter);

const Select = ({ className, activeOption, options = [], name, type, onSelect, match }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const branch = useSelector(state => state.branch).branch;
    // const dispatch = useDispatch();

    const toggleOpen = () => {
        setIsOpen(isOpen => !isOpen);
    };

    const handleSelect = (repo) => {
        // dispatch(fetchFilesStartAsync(repo, 'master'));
        onSelect(repo);
        setIsOpen(false);
    };

    return (
        <div className={cnSelect('Wrapper')}>
            <div className={cnSelect({}, [className])} onClick={toggleOpen}>
                <span className={cnSelect('Name')}>
                    { name &&
                        <span className={cnSelect('Name', {weight: 'bold'})}>{name} </span>
                    }
                    {activeOption}
                </span>
                <Arrow
                    className={cnSelect('Arrow', { type: type })}
                    state={isOpen ? 'up' : 'down'}
                />
            </div>
            { isOpen &&
                <div className={cnSelect('Body', { type: type })}>
                    {
                        options.length && options.map((name, i) => {
                            let link = '';
                            if (type === 'repo') {
                                link = `/${name}/master`;
                            } else {
                                link = `/${match.params.repo}/${name}`;
                            }
                            return (
                                <Link to={link} key={i}>
                                    <div key={i}
                                         onClick={() => handleSelect(name)}
                                         className={name === activeOption ?
                                             cnSelect('Item', { type: type, state: 'selected' }) :
                                             cnSelect('Item', { type: type })
                                         }
                                    >
                                        {name}
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>
            }
        </div>
    );
};

export default withRouter(Select);
