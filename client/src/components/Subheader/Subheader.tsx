import React, { ReactNode, FC } from 'react';
import './Subheader.scss';

export interface SubheaderProps {
    children?: ReactNode;
}

const Subheader: FC<SubheaderProps> = ({children}) => {
    return (
        <div className='Subheader'>
            {children}
        </div>
    );
};

export default Subheader;
