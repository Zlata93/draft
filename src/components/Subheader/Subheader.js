import React from 'react';
import './Subheader.scss';

const Subheader = ({children}) => {
    return (
        <div className='Subheader'>
            {children}
        </div>
    );
};

export default Subheader;
