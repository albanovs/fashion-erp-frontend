import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import SimcardLogist from './components/simcardLogist';
import { fetchReportsSimLog } from 'src/app/slices/simcard/monaco';
import LoadAnimate from '../../departments/components/pages/loading_animate';

export default function SimCardMonacoLog() {

    const dispatch = useDispatch();
    const { simcard, status } = useSelector((state) => state.logistmonaco);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReportsSimLog());
        }
    }, [dispatch]);
    return (
        <div>
            {
                status === 'succeeded' ?
                    (
                        <div className='p-10'>
                            <SimcardLogist
                                datas={simcard}
                                api='MonacoLogs'
                                addSlot='simcardmonacolog'
                                slot='slotmonacolog'
                                update='simCardMonacoLogs'
                                title='Отдел Монако'
                            />
                        </div>
                    ) : <LoadAnimate />
            }
        </div>
    )
}