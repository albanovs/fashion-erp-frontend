import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ListManager from '../../components/reports/list-otchet/list-manager';
import { fetchReports } from 'src/app/slices/departments/monaco/reports';

export default function ListManagerMonaco() {

    const { reports, status } = useSelector((state) => state.monaco_reports);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReports());
        }
    }, [dispatch]);

    return (
        <div>
            {status === 'succeeded' ? <ListManager datas={reports} api='monaco' /> : 'загрузка...'}
        </div>
    )
}