import React from 'react';
import { cn } from '@bem-react/classname';
import './Main.scss';

const cnMain = cn('Main');

const Main = ({ children }) => {
    return (
        <div className={cnMain()}>
            {children}
        </div>
    );
};

export default Main;
