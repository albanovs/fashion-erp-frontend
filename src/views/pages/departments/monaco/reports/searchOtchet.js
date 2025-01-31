import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SearchList from '../../components/reports/list-otchet/searchList';
import { fetchReports } from 'src/app/slices/departments/monaco/reports';

export default function SearchMonacoList() {

    const { reports, status } = useSelector((state) => state.monaco_reports);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReports());
        }
    }, [dispatch]);
    return (
        <>
            {status === 'succeeded' ? < SearchList datas={reports} /> : 'загрузка...'}
        </>
    )
}