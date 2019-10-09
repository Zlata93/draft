import React, { ReactNode, FC } from 'react';
import { cn } from '@bem-react/classname';
import './IconPlus.scss';

export const cnIconPlus = cn('IconPlus');

export interface IconPlusProps {
    type?: string;
    weight?: string;
    children?: ReactNode | string;
    className?: string;
}

const IconPlus: FC<IconPlusProps> = ({ type, className, children }) => {
    return (
        <div className={cnIconPlus({}, [className])}>
            <div className={cnIconPlus('Icon', { type: type })}/>
            {children}
        </div>
    );
};

export default IconPlus;
