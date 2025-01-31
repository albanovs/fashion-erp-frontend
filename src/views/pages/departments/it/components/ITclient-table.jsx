import React from 'react'

export default function ITclientTable({ datas, type }) {
    return (
        <div>
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
                        type && type === 'x% online' ? datas.map(elem => {
                            if (elem.buyer_logist === 'x% online') {
                                return (
                                    <tr key={elem._id} className={`${elem.status ? 'text-green-400' : 'text-red-400'}`}>
                                        <td className='border'>{elem.clients}</td>
                                        <td className='border'>{elem.buyer_logist}</td>
                                        <td className='border'>{elem.summa}</td>
                                        <td className='border'>{elem.date_to}</td>
                                        <td className='border'>{elem.date_go}</td>
                                        <td className='border'>{elem.order_count}</td>
                                        <td className='border'>{elem.status ? 'актуально' : 'неактуально'}</td>
                                    </tr>
                                )
                            }
                        }) : datas.map(elem => (
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
    )
}
