import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRepo } from '../../store/repos/repos.actions';

const Repos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRepo(''));
    }, [dispatch]);
    return (
        <div>
            <div style={{ padding: '20px 0'}}>Select repository</div>
        </div>
    );
};

export default Repos;
