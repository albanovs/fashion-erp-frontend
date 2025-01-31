import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SearchList from '../../components/reports/list-otchet/searchList';
import { fetchReports } from 'src/app/slices/departments/ilyas/reports';

export default function SearchIlyasList() {

    const { reports, status } = useSelector((state) => state.ilyas_reports);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReports());
    }, [dispatch]);
    return (<>
        {status === 'succeeded' ? <SearchList datas={reports} /> : 'загрузка...'}
    </>)
}