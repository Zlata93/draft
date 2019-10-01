import React from 'react';
import { cn } from '@bem-react/classname';
import './Layout.scss';

export const cnLayout = cn('Layout');

const Layout = ({ children }) => {
    return (
        <div className={cnLayout()}>
            {children}
        </div>
    );
};

export default Layout;
