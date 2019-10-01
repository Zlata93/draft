import React from 'react';
import { compose } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Select.scss'

import { withArrowStateDown } from '../Arrow/_state/Arrow_state_down';

import ArrowPresenter from '../Arrow/Arrow';

export const cnSelect = cn('Select');

const Arrow = compose(withArrowStateDown)(ArrowPresenter);

const Select = ({ className, children }) => {
    return (
        <div className={cnSelect({}, [className])}>
            <span className={cnSelect('Name')}>{children}</span>
            <Arrow
                className={cnSelect('Arrow')}
                state='down'
            />
        </div>
    );
};

export default Select;
