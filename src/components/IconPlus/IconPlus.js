import React from 'react';
import { cn } from '@bem-react/classname';
import './IconPlus.scss';

export const cnIconPlus = cn('IconPlus');

const IconPlus = ({ type, className, children }) => {
    return (
        <div className={cnIconPlus({}, [className])}>
            <div className={cnIconPlus('Icon', { type: type })}/>
            {children}
        </div>
    );
};

export default IconPlus;
