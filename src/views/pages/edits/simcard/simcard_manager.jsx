import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Simcard from './components/simcard';
import { fetchReportsSimManager } from 'src/app/slices/simcard/managers';
import LoadAnimate from '../../departments/components/pages/loading_animate';

export default function SimCardManager() {

    const dispatch = useDispatch();
    const { simcard, status } = useSelector((state) => state.managerssimcard);
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
                                api='managers'
                                addSlot='simcardManagers'
                                slot='slotsManagers'
                                update='simcardmanagers'
                                title='Старшие менеджеры'
                                name='Менеджер'
                            />
                        </div>
                    ) : <LoadAnimate />
            }
        </div>
    )
}