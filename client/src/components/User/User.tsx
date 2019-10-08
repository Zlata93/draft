import React from 'react';
import './User.scss';

export interface UserProps {
    children: string;
}

const User: React.FC<UserProps> = ({ children }) => {
    return (
        <span className='User'>
            {children}
        </span>
    );
};

export default User;
