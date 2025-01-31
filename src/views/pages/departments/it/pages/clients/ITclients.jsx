import React, { useState } from 'react'
import { fetchClients } from '../../../../app/slices/itogs/clientsSlice'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../../components/Cards/TitleCard';
import ITclientTable from '../../components/ITclient-table';

export default function ITclients() {

    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.dataCLient);

    const [isClient, setIsClient] = useState('')
    const [otdel, setOtdel] = useState([])

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const checkStringMatch = (str1, str2) => {
        const regex = new RegExp(str2, 'i');
        return regex.test(str1);
    };

    const filteredClients = clients[otdel]?.filter((client) =>
        checkStringMatch(client.clients, isClient)
    );

    return (
        <div>
            {
                typeof clients.lider === 'object' ?
                    <TitleCard title={'Привлеченные клиенты'}>
                        <div className='flex gap-5 mb-10'>
                            <h1 className='p-1'>Поиск клиента:</h1>
                            <div className='flex items-center gap-5'>
                                <h1>Отдел:</h1>
                                <select
                                    onChange={(e) => setOtdel(e.target.value)}
                                    value={otdel}
                                    className='bg-inherit outline-none border rounded-md p-1'>
                                    <option value={''}>Выберите отдел</option>
                                    <option value={'lider'}>Лидер</option>
                                    <option value={'monaco'}>Монако</option>
                                    <option value={'turan'}>ТУран</option>
                                    <option value={'fenix'}>Ильяс</option>
                                    <option value={'fbox'}>FBOX</option>
                                    <option value={'liberty'}>Liberty</option>
                                </select>
                            </div>
                            <input type="text" className='bg-inherit outline-none border rounded-md p-1'
                                placeholder='Введите имя'
                                onChange={(e) => setIsClient(e.target.value)}
                            />
                        </div>
                        <div>
                            {isClient && (
                                <div>
                                    <h1>Результаты поиска:</h1>
                                    <table className='border lg:table lg:text-[12px] text-[7px] w-full lg:text-center'>
                                        <thead>
                                            <tr>
                                                <th className='border'>Имя клиента</th>
                                                <th className='border'>байер/логист</th>
                                                <th className='border'>сумма</th>
                                                <th className='border'>дата входа</th>
                                                <th className='border'>дата окончание</th>
                                                <th className='border'>кол-во заказов</th>
                                                <th className='border'>статус</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredClients?.map((elem) => (
                                                    <tr key={elem._id} className={`${elem.status ? 'text-green-400' : 'text-red-400'}`}>
                                                        <td className='border'>{elem.clients}</td>
                                                        <td className='border'>{elem.buyer_logist}</td>
                                                        <td className='border'>{elem.summa}</td>
                                                        <td className='border'>{elem.date_to}</td>
                                                        <td className='border'>{elem.date_go}</td>
                                                        <td className='border'>{elem.order_count}</td>
                                                        <td className='border'>{elem.status ? 'актуально' : 'неактуально'}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        {
                            isClient === '' && (
                                <div>
                                    <div className='text-center mb-10'>
                                        <h1>Лидер</h1>
                                        <ITclientTable datas={clients.lider} />
                                    </div>
                                    <div className='text-center mb-10'>
                                        <h1>Монако</h1>
                                        <ITclientTable datas={clients.monaco} />
                                    </div>
                                    <div className='text-center mb-10'>
                                        <h1>Туран</h1>
                                        <ITclientTable datas={clients.turan} />
                                    </div>
                                    <div className='text-center mb-10'>
                                        <h1>Ильяс</h1>
                                        <ITclientTable datas={clients.fenix} />
                                    </div>
                                    <div className='text-center mb-10'>
                                        <h1>FBOX.KG</h1>
                                        <ITclientTable datas={clients.fbox} />
                                    </div>
                                    <div className='text-center mb-10'>
                                        <h1>Liberty</h1>
                                        <ITclientTable datas={clients.liberty} />
                                    </div>
                                </div>
                            )
                        }
                    </TitleCard> : <div>загрузка...</div>
            }
        </div>
    )
}
