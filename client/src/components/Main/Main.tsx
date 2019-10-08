import React, { ReactNode, FC } from 'react';
import { cn } from '@bem-react/classname';
import './Main.scss';

const cnMain = cn('Main');

export interface MainProps {
    children?: ReactNode | string;
    className?: string;
}

const Main: FC<MainProps> = ({ children }) => {
    return (
        <div className={cnMain()}>
            {children}
        </div>
    );
};

export default Main;
