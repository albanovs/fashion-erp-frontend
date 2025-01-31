import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Simcard from './components/simcard';
import { fetchReportsSimManager } from 'src/app/slices/simcard/monaco_manager';
import LoadAnimate from '../../departments/components/pages/loading_animate';

export default function SimCardMonacoManager() {

    const dispatch = useDispatch();
    const { simcard, status } = useSelector((state) => state.managermonaco);
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
                                api='Liders'
                                addSlot='simcards'
                                slot='slots'
                                update='simcards'
                                title='Отдел Монако'
                                name='Байер'
                            />
                        </div>
                    ) : <LoadAnimate />
            }
        </div>
    )
}