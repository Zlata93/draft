import React, { ReactNode, FC } from 'react';
import { cn } from '@bem-react/classname';
import './Link.scss';

export const cnLink = cn('Link');

export interface LinkProps {
    children?: ReactNode | string;
    className?: string;
    target?: string;
    href: string;
}

const Link: FC<LinkProps> = ({ className, children, target, href }) => {
    return (
        <a href={href} target={target} className={cnLink({}, [className])}>
            {children}
        </a>
    );
};

export default Link;
