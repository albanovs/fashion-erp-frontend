import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ListManager from '../../components/reports/list-otchet/list-manager';
import { fetchReports } from 'src/app/slices/departments/turan/reports';

export default function ListManagerTuran() {

    const { reports, status } = useSelector((state) => state.turan_reports);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReports());
        }
    }, [dispatch]);

    return (
        <div>
            {status === 'succeeded' ? <ListManager datas={reports} api='turan' /> : 'загрузка...'}
        </div>
    )
}