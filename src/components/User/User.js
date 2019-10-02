import React from 'react';
import './User.scss'

const User = ({ children }) => {
    return (
        <span className='User'>
            {children}
        </span>
    );
};

export default User;
