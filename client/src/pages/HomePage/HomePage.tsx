import React, { useState, useEffect, FC } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState } from "../../store";
import { RepoProps } from "../../components/Repo/Repo";
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@bem-react/classname';
import { compose } from '@bem-react/core';
import getPathFromLocation from '../../utils/getPathFromLocation';
import './HomePage.scss';

import { fetchReposStartAsync } from '../../store/repos/repos.actions';
import { fetchCommitsStartAsync } from '../../store/commits/commits.actions';
import { setBranch } from '../../store/branch/branch.actions';

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
    // {
    //     id: 2,
    //     name: 'branches'
    // }
];

const HomePage: FC<RouteComponentProps> = ({ location }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const dispatch = useDispatch();
    const branch = useSelector((state: AppState) => state.branch).branch;
    const repo = useSelector((state: AppState) => state.repos).repo;

    useEffect(() => {
        dispatch(fetchReposStartAsync());
    }, [dispatch]);

    const onTabClick = (id: number) => {
        setActiveTab(id);
    };

    const onSelectBranch = (branch: string) => {
        dispatch(setBranch(branch));
        dispatch(fetchCommitsStartAsync(repo, branch))
    };

    let path = getPathFromLocation(location.pathname);

    return (
        <div className={cnHomePage()}>
            <Section indentH='xxl' className={cnHomePage('Section')}>
                <Subheader>
                    <Breadcrumbs />
                </Subheader>
            </Section>
            <div>
                <Switch>
                    <Route
                        exact path="/"
                        render={() => <Repos />}
                    />
                    <Route
                        path={`/:repo/:branch`}
                        render={(props) => <Repo {...props} activeTab={activeTab} onTabClick={onTabClick} onSelectBranch={onSelectBranch} />}
                    />
                    <Route
                        path={`${path}/:file`}
                        render={(props) =>
                            <Repo {...props} activeTab={1} onTabClick={onTabClick} onSelectBranch={onSelectBranch} />}
                    />
                </Switch>
            </div>
        </div>
    );
};

export default withRouter(HomePage);