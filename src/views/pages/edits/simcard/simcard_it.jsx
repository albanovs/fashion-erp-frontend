import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Simcard from './components/simcard';
import { fetchReportsSimIT } from 'src/app/slices/simcard/it';
import LoadAnimate from '../../departments/components/pages/loading_animate';

export default function SimCardIt() {

    const dispatch = useDispatch();
    const { simcard, status } = useSelector((state) => state.itsimcard);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReportsSimIT());
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
                                api='global'
                                addSlot='simcardsglobal'
                                slot='slotsglobal'
                                update='simcardsglobal'
                                title='Отдел IT'
                                name='Имя сотрудника'
                            />
                        </div>
                    ) : <LoadAnimate />
            }
        </div>
    )
}