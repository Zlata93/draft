import React from 'react';
import { cn } from '@bem-react/classname';
import './Tabs.scss';

const cnTabs = cn('Tabs');

const Tabs = ({ tabs, activeTab, handleClick }) => {
    return (
        <div className={cnTabs()}>
            {
                tabs.map(({ name, id }) =>
                    <div
                        key={id}
                        onClick={() => handleClick(id)}
                        className={id === activeTab ?
                            cnTabs('Item', {state: 'active'}) :
                            cnTabs('Item')}
                    >
                        {name}
                    </div>
                )
            }
        </div>
    );
};

export default Tabs;
