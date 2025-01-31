import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SearchList from '../../components/reports/list-otchet/searchList';
import { fetchReports } from 'src/app/slices/departments/turan/reports';

export default function SearchTuranList() {

    const { reports, status } = useSelector((state) => state.turan_reports);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReports());
        }
    }, [dispatch]);
    return (
        <>
            {status === 'succeeded' ? <SearchList datas={reports} /> : 'загрузка...'}
        </>
    )
}