import React, { ReactNode, FC } from 'react';
import { cn } from '@bem-react/classname';
import './Layout.scss';

export const cnLayout = cn('Layout');

export interface LayoutProps {
    children?: ReactNode | string;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={cnLayout()}>
            {children}
        </div>
    );
};

export default Layout;
