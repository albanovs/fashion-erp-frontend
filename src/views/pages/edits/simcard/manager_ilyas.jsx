import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Simcard from './components/simcard';
import { fetchReportsSimManager } from 'src/app/slices/simcard/ilyas_manager';
import LoadAnimate from '../../departments/components/pages/loading_animate';

export default function SimCardIlyasManager() {

    const dispatch = useDispatch();
    const { simcard, status } = useSelector((state) => state.managerilyas);
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
                                api='Fenixes'
                                addSlot='simcardfenixes'
                                slot='simcardFenixslot'
                                update='simcardfenix'
                                title='Отдел феникс'
                                name='Байер'
                            />
                        </div>
                    ) : <LoadAnimate />
            }
        </div>
    )
}