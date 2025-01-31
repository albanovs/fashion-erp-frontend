import { CCard } from '@coreui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchReports } from 'src/app/slices/departments/turan/reports';
import LoadAnimate from '../../components/pages/loading_animate';

export default function DetailListManagerTuran() {
    const { id } = useParams();

    const { reports, status } = useSelector((state) => state.turan_reports);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReports());
        }
    }, [dispatch]);

    const selectedData = status === 'succeeded' && reports.find((elem) => elem._id === id)

    return (
        selectedData ? (<CCard className='mb-4 p-4'>
            <p className='text-center mt-10 mb-10 text-sm'>дата: {selectedData.date}</p>
            <table className='lg:text-sm text-[8px] text-center w-full'>
                <thead>
                    <tr>
                        <th className='border'>№</th>
                        <th className='border'>Имя и город</th>
                        <th className='border'>Админ</th>
                        <th className='border'>Комиссия</th>
                        <th className='border'>Байер</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedData.otchet.map((item, index) => {
                            const shouldRenderItem = item.sity !== '' && item.comPersent100 !== 0;
                            if (shouldRenderItem) {
                                return (
                                    <tr key={item._id}>
                                        <td className={`border lg:p-1`}>{index + 1}</td>
                                        <td className={`border lg:p-1`}>{item.sity}</td>
                                        <td className={`border lg:p-1`}>{item.admin}</td>
                                        <td className={`border lg:p-1`}>{item.comPersent100}</td>
                                        <td className={`border lg:p-1`}>{item.buyer}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>

        </CCard>) : (
            <div className='w-full gap-2 flex-col flex justify-center items-center'><LoadAnimate />загружаем данных, просим подождать</div>
        )
    )
}