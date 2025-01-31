import { CCard } from '@coreui/react';
import React, { useState } from 'react'

export default function SearchList({ datas }) {

    const [filteredClients, setFilteredClients] = useState([])
    const [isClient, setIsClient] = useState('')

    const handleInputChange = (e) => {
        const value = e.target.value;
        setIsClient(value);
        filterClients();
    };

    const filterClients = () => {
        const filteredClients = datas.filter((client) =>
            client.otchet.some((item) => {
                if (item.sity) {
                    const formattedSity = item.sity.toLowerCase().replace(/\s/g, '');
                    const formattedIsClient = isClient.toLowerCase().replace(/\s/g, '');

                    return formattedSity.includes(formattedIsClient);
                }
                return false;
            })
        );
        setFilteredClients(filteredClients);
    };

    return (
        <div>
            {
                datas && typeof datas === 'object' ? <CCard className='mb-4 p-4'>
                    <div className='flex flex-col lg:flex-row gap-5 mb-10'>
                        <div className='flex items-center gap-5'>
                            <h1 className='text-sm'>Имя клиента:</h1>
                            <input type="text" className='bg-inherit outline-none border rounded-md p-1'
                                placeholder='Введите имя'
                                onChange={(e) => {
                                    setTimeout(() => {
                                        handleInputChange(e)
                                    }, 1000)
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        {isClient && (
                            <div>
                                <h1 className='text-sm'>Результаты поиска:</h1>
                                <table className='border lg:text-[12px] text-[7px] w-full lg:text-center'>
                                    <thead className=' lg:text-[12px] text-[4px] text-white bg-gradient-to-r from-blue-500 to-purple-500'>
                                        <tr>
                                            <th className="border lg:py-1 lg:px-3" rowSpan="3">дата</th>
                                            <th className="border lg:py-1 lg:px-3" colSpan="3">Комиссия</th>
                                            <th className="border lg:py-1 lg:px-3" rowSpan="3">СМ</th>
                                            <th className="border lg:py-1 lg:px-3">100%</th>
                                            <th className="border lg:py-1 lg:px-3">40%</th>
                                            <th className="border lg:py-1 lg:px-3">20%</th>
                                            <th className="border lg:py-1 lg:px-3">40%</th>
                                            <th className="border lg:py-1 lg:px-2" colSpan="4">Итоги</th>
                                        </tr>
                                        <tr>
                                            <th className="border lg:py-1 lg:px-2 " colSpan="3">Индекс</th>
                                            <th className="border lg:py-1 lg:px-2 ">100%</th>
                                            <th className="border lg:py-1 lg:px-2 ">34%</th>
                                            <th className="border lg:py-1 lg:px-2 ">33%</th>
                                            <th className="border lg:py-1 lg:px-2 ">33%</th>
                                            <th className="border lg:py-1 lg:px-2 " rowSpan="2">Уход</th>
                                            <th className="border lg:py-1 lg:px-2 " rowSpan="2">Приход</th>
                                            <th className="border lg:py-1 lg:px-2 " rowSpan="2">Итог (+40 отправка)</th>
                                            <th className="border lg:py-1 lg:px-2 " rowSpan="2">Итог индекс</th>
                                        </tr>
                                        <tr>
                                            <th className="border lg:py-1 lg:px-2 lg:w-[200px]">Имя и Город</th>
                                            <th className="border lg:py-1 lg:px-2">Админ</th>
                                            <th className="border lg:py-1 lg:px-2 ">байер</th>
                                            <th className="border lg:py-1 lg:px-2 " colSpan="5"></th>
                                        </tr>
                                    </thead>
                                    {
                                        filteredClients?.map((data) => (
                                            data.otchet.map((elem, index) => {
                                                const shouldRenderItem =
                                                    elem.sity !== '' &&
                                                    elem.comPersent100 !== 0 && elem.sity.toLowerCase().replace(/\s/g, '').includes(isClient.toLowerCase().replace(/\s/g, ''))
                                                const isOdd = index % 2 === 1;
                                                if (shouldRenderItem) {
                                                    return (
                                                        <tbody key={elem._id} className={isOdd ? "bg-inherit text-[4px] lg:text-[10px]" : "text-[4px] lg:text-[10px]"}>
                                                            <tr>
                                                                <td className="border lg:py-1 lg:px-3" rowSpan="2">
                                                                    {data.date}
                                                                </td>
                                                                <td className={isOdd ? "border text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                                    {elem.sity}
                                                                </td>
                                                                <td className={isOdd ? "border  text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                                    {elem.admin}
                                                                </td>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                                    {elem.buyer}
                                                                </td>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                                    {elem.sm === 0 ? 1 : elem.sm}
                                                                </td>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'}>
                                                                    {elem.comPersent100}
                                                                </td>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'}>
                                                                    {elem.comPersent2}
                                                                </td>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'}>
                                                                    {elem.comPersent3}
                                                                </td>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'}>
                                                                    {elem.comPersent4}
                                                                </td>

                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                                    {elem.uhod === 0 ? '' : elem.uhod}
                                                                </td>
                                                                <td className={isOdd ? " border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                                    {elem.prihod === 0 ? '' : elem.prihod}
                                                                </td>
                                                                <td className={isOdd ? " border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                                    {elem.itog}
                                                                </td>
                                                                <td className={isOdd ? " border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                                    {elem.itogIndex === 0 ? '' : elem.itogIndex}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border  lg:py-1 lg:px-3'}>
                                                                    {elem.indexPersent100 === 0 ? '' : elem.indexPersent100}
                                                                </td>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border  lg:py-1 lg:px-3'}>
                                                                    {elem.indexPersent2 === 0 ? '' : elem.indexPersent2}
                                                                </td>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border  lg:py-1 lg:px-3'}>
                                                                    {elem.indexPersent3 === 0 ? '' : elem.indexPersent3}
                                                                </td>
                                                                <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border  lg:py-1 lg:px-3'}>
                                                                    {elem.indexPersent4}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                }
                                            }
                                            )
                                        ))
                                    }
                                </table>
                            </div>
                        )}
                    </div>
                </CCard> : 'загрузка...'
            }
        </div>
    )
}