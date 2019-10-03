import React, { useState } from 'react';
import { compose, composeU } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Select.scss'

import { withArrowStateDown } from '../Arrow/_state/Arrow_state_down';
import { withArrowStateUp } from '../Arrow/_state/Arrow_state_up';

import ArrowPresenter from '../Arrow/Arrow';

export const cnSelect = cn('Select');

const Arrow = compose(composeU(withArrowStateUp, withArrowStateDown))(ArrowPresenter);

const Select = ({ className, activeOption, options = [], name, type, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(isOpen => !isOpen);
    };

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className={cnSelect('Wrapper')}>
            <div className={cnSelect({}, [className])} onClick={toggleOpen}>
                <span className={cnSelect('Name')}>
                    { name &&
                        <span className={cnSelect('Name', {weight: 'bold'})}>{name} </span>
                    }
                    {activeOption && activeOption.name}
                </span>
                <Arrow
                    className={cnSelect('Arrow')}
                    state={isOpen ? 'up' : 'down'}
                />
            </div>
            { isOpen &&
                <div className={cnSelect('Body', { type: type })}>
                    {
                        options.length && options.map(({ name, id }) =>
                            <div
                                onClick={() => handleSelect({ name, id })}
                                key={id}
                                className={id === activeOption.id ?
                                    cnSelect('Item', { type: type, state: 'selected' }) :
                                    cnSelect('Item', { type: type })
                                }
                            >
                                {name}
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default Select;
