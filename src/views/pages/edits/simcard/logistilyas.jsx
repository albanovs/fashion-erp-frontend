import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import SimcardLogist from './components/simcardLogist';
import { fetchReportsSimLog } from 'src/app/slices/simcard/ilyas';
import LoadAnimate from '../../departments/components/pages/loading_animate';

export default function SimCardIlyasLog() {

    const dispatch = useDispatch();
    const { simcard, status } = useSelector((state) => state.logistilyas);

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
                                api='FenixLogs'
                                addSlot='simcardfenixlog'
                                slot='slotfenixlog'
                                update='simCardFenixLogs'
                                title='Отдел Ильяс'
                            />
                        </div>
                    ) : <LoadAnimate />
            }
        </div>
    )
}