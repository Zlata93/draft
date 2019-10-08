import React, { ReactNode } from 'react';
import './Subheader.scss';

export interface SubheaderProps {
    children?: ReactNode;
}

const Subheader: React.FC<SubheaderProps> = ({children}) => {
    return (
        <div className='Subheader'>
            {children}
        </div>
    );
};

export default Subheader;
