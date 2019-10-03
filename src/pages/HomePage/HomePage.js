import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { compose } from '@bem-react/core';
import { createBrowserHistory } from 'history';
import './HomePage.scss';

import { fetchReposStartAsync } from '../../store/repos/repos.actions';

import SectionPresenter from '../../components/Section/Section';
import { withSectionIndentHXxl } from '../../components/Section/_indent-h/Section_indent-h_xxl';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Subheader from '../../components/Subheader/Subheader';
import Repos from '../../components/Repos/Repos';
import Repo from '../../components/Repo/Repo';

export const cnHomePage = cn('HomePage');
const Section = compose(withSectionIndentHXxl)(SectionPresenter);

const tabs = [
    {
        id: 1,
        name: 'files'
    },
    {
        id: 2,
        name: 'branches'
    }
];

const history = createBrowserHistory();

const HomePage = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [branchName, setBranchName] = useState({name: 'trunk', id: '1'});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReposStartAsync());
    }, []);

    const onTabClick = (id) => {
        setActiveTab(id);
    };

    const onSelectBranch = (name) => {
        setBranchName(name);
        const path = history.location.pathname;
        const index = path.lastIndexOf('/');
        const newPath = path.slice(0, index);
        history.replace(`${newPath}/${name.name}`)
    };

    return (
        <div className={cnHomePage()}>
            <Section indentH='xxl' className={cnHomePage('Section')}>
                <Router history={history}>
                    <Subheader>
                        <Breadcrumbs branchName={branchName.name}/>
                    </Subheader>
                    <div>
                        <Switch>
                            <Route
                                exact path="/"
                                render={(props) => <Repos {...props} branchName={branchName} />}
                            />
                            <Route
                                path={`/:repo/${branchName.name}`}
                                render={(props) => <Repo {...props} activeTab={activeTab} branchName={branchName} onTabClick={onTabClick} onSelectBranch={onSelectBranch} />}
                            />
                        </Switch>
                    </div>
                </Router>
            </Section>
        </div>
    );
};

export default HomePage;
