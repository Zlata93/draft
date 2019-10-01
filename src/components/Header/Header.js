import React from 'react';
import { compose } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Header.scss';

import { withSelectSizeS } from '../Select/_size/Select_size_s';
import SelectPresenter from '../Select/Select';

export const cnHeader = cn('Header');

const Select = compose(withSelectSizeS)(SelectPresenter);

const Header = () => {
    return (
        <header className={cnHeader()}>
            <div className={cnHeader('Logo')}/>
            <Select size='s'>
                <span className={cnHeader('Select', ['Select-Name_weight_bold'])}>Repository</span> Arc
            </Select>
        </header>
    );
};

export default Header;
