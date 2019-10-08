import React from 'react';
import { cn } from '@bem-react/classname';
import './Arrow.scss';

export const cnArrow = cn('Arrow');

export interface ArrowProps {
    className?: string;
}

const Arrow: React.FC<ArrowProps> = ({className}) => {
    return <i className={cnArrow({}, [className])}/>
};

export default Arrow;
