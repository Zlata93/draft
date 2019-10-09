import React, { useState, FC } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { compose, composeU } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Select.scss'

import { withArrowStateDown } from '../Arrow/_state/Arrow_state_down';
import { withArrowStateUp } from '../Arrow/_state/Arrow_state_up';
import ArrowPresenter from '../Arrow/Arrow';

export const cnSelect = cn('Select');

const Arrow = compose(composeU(withArrowStateUp, withArrowStateDown))(ArrowPresenter);

type PathParamsType = {
    repo: string;
}

export interface SelectProps extends RouteComponentProps<PathParamsType> {
    className?: string;
    activeOption: string;
    options: string[];
    name?: string;
    type?: string;
    size?: string;
    onSelect: (name: string) => {}
}

const Select: FC<SelectProps> = ({ className, activeOption, options = [], name, type, onSelect, match }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        if (options.length === 0) return;
        setIsOpen(isOpen => !isOpen);
    };

    const handleSelect = (name: string) => {
        onSelect(name);
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
                        options.length > 0 && options.map((name, i) => {
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
