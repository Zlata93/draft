import React from 'react';
import { cn } from '@bem-react/classname';
import './Arrow.scss';

export const cnArrow = cn('Arrow');

const Arrow = ({className}) => (
    <i className={cnArrow({}, [className])}/>
);

export default Arrow;
