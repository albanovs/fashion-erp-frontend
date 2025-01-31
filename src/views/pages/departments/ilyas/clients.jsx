import { CCard } from '@coreui/react';
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Clients from '../components/reports/clients';
import { fetchClientIilyas } from 'src/app/slices/departments/ilyas/clients';

export default function IlyasClients() {

    const dispatch = useDispatch()
    const { client, client_status } = useSelector((state) => state.ilyas_client);

    useEffect(() => {
        dispatch(fetchClientIilyas());
    }, [dispatch]);

    return (
        <div>
            {
                client_status === 'succeeded' ? <div className='lg:text-sm text-[10px]'>
                    <CCard>
                        <div className='mb-10'>
                            <Clients datas={client} />
                        </div>
                    </CCard>
                </div> : 'загрузка...'
            }
        </div>
    )
}
