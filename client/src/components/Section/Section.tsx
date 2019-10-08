import React, { ReactNode, FC } from 'react';
import { cn } from '@bem-react/classname';
import './Section.scss';

export const cnSection = cn('Section');

export interface SectionProps {
    children?: ReactNode | string;
    className?: string;
    indentH?: string;
    indentV?: string;
}

const Section: FC<SectionProps> = ({ children, className }) => {
    return (
        <div className={cnSection({}, [className])}>
            {children}
        </div>
    );
};

export default Section;
