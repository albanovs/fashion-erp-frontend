import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import SimcardLogist from './components/simcardLogist';
import { fetchReportsSimLog } from 'src/app/slices/simcard/turan';
import LoadAnimate from '../../departments/components/pages/loading_animate';

export default function SimCardTuranLog() {

    const dispatch = useDispatch();
    const { simcard, status } = useSelector((state) => state.logistturan);

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
                                api='TuranLogs'
                                addSlot='simcardturanlog'
                                slot='slotturanlog'
                                update='simCardTuranLogs'
                                title='Отдел Туран'
                            />
                        </div>
                    ) : <LoadAnimate />
            }
        </div>
    )
}