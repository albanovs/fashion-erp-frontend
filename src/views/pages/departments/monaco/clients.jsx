import { CCard } from '@coreui/react';
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Clients from '../components/reports/clients';
import { fetchClientMonaco } from 'src/app/slices/departments/monaco/clients';

export default function MonacoClients() {

    const dispatch = useDispatch()
    const { client, client_status } = useSelector((state) => state.monaco_client);

    useEffect(() => {
        if (client_status === 'idle') {
            dispatch(fetchClientMonaco());
        }
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
