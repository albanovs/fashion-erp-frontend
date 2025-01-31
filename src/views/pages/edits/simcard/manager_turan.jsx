import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Simcard from './components/simcard';
import { fetchReportsSimManager } from 'src/app/slices/simcard/turan_manager';
import LoadAnimate from '../../departments/components/pages/loading_animate';

export default function SimCardTuranManager() {

    const dispatch = useDispatch();
    const { simcard, status } = useSelector((state) => state.managerturan);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReportsSimManager());
        }
    }, [dispatch]);

    return (
        <div>
            {
                status === 'succeeded' ?
                    (
                        <div className='p-10'>
                            <Simcard
                                datas={simcard}
                                api='Turans'
                                addSlot='simcardTurans'
                                slot='simcardTuranslot'
                                update='simCardTurans'
                                title='Отдел Туран'
                                name='Байер'
                            />
                        </div>
                    ) : <LoadAnimate />
            }
        </div>
    )
}