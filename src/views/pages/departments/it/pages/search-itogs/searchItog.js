import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateSearch from '../../components/date-search';
import { CCard } from '@coreui/react';
import { fetchReports } from 'src/app/slices/departments/monaco/reports';
import { fetchReports as fetchReportsTuran } from 'src/app/slices/departments/turan/reports';
import { fetchReports as fetchReportsIlyas } from 'src/app/slices/departments/ilyas/reports';

export default function SearchItogs() {

    const [responseData, setResponseData] = useState([]);
    const [selectValue, setSelectValue] = useState('1');
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch()

    const { reports, status } = useSelector((state) => state.monaco_reports);
    const turan = useSelector((state) => state.turan_reports.reports);
    const statusTuran = useSelector((state) => state.turan_reports.status);
    const fenix = useSelector((state) => state.ilyas_reports.reports);
    const statusFenix = useSelector((state) => state.ilyas_reports.status);

    useEffect(() => {
        if (selectValue === "1") {
            setResponseData(reports)
        } else if (selectValue === "3") {
            setResponseData(turan)
        } else if (selectValue === "4") {
            setResponseData(fenix)
        } else {
            setResponseData([])
        }
    }, [selectValue])

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReports())
        }
    }, [dispatch]);

    useEffect(() => {
        if (statusTuran === 'idle') {
            dispatch(fetchReportsTuran())
        }
    }, [dispatch]);

    useEffect(() => {
        if (statusFenix === 'idle') {
            dispatch(fetchReportsIlyas())
        }
    }, [dispatch]);

    return (
        <div>
            {
                status === 'succeeded' ? (<CCard className='p-3'>
                    <div className='flex lg:items-center mb-10 lg:flex-row flex-col gap-3'>
                        Выберите команду:
                        <select
                            className='bg-inherit outline-none border rounded-md p-1'
                            value={selectValue}
                            onChange={(e) => setSelectValue(e.target.value)}
                        >
                            <option value="0">Не выбрано</option>
                            <option value="1">Монако</option>
                            <option value="3">Туран</option>
                            <option value="4">Ильяс</option>
                        </select>
                        Введите дату:
                        <input
                            className='bg-inherit outline-none border rounded-md p-1'
                            placeholder='14.10.2023'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <DateSearch data={responseData} searchValue={searchValue} />
                </CCard>) : <div>Загрузка...</div>
            }
        </div>
    )
}