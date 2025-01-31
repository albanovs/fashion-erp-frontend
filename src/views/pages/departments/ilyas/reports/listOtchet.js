import React, { useEffect } from 'react'
import OtchetList from '../../components/reports/list-otchet/listOtchet'
import { fetchReports } from 'src/app/slices/departments/ilyas/reports';
import { useDispatch, useSelector } from 'react-redux';
import LoadAnimate from '../../components/pages/loading_animate';

export default function OtchetListIlyas() {

    const { reports, status } = useSelector((state) => state.ilyas_reports);
    const dispatch = useDispatch();


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReports())
        }
    }, [dispatch]);

    return (
        status === 'succeeded' ? (
            <OtchetList datas={reports} api="ilyas" />
        ) : (
            <div className='w-full gap-2 flex-col flex justify-center items-center'><LoadAnimate />загружаем данных, просим подождать</div>
        )
    )
}