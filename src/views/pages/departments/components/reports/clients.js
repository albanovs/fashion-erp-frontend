import React from 'react'

export default function Clients({ datas }) {
    return (
        <div>
            <div className='flex lg:flex-row flex-col justify-between gap-5 mb-5 p-4'>
                <div className='lg:w-[500px] border rounded-md p-2'>
                    <h1 className='font-bold text-xl'>
                        Правила использования привлеченного клиента в отчете:
                    </h1>
                    <p className=''>
                        Когда вы первый раз вводите новое имя привлеченного клиента в отчете, например,
                        "Анна Москва", просим в последующем также писать аналогично.
                    </p>
                    <h1 className='font-bold mt-5 text-xl'> Допускаются следующие варианты:</h1>
                    <ul className=''>
                        <li> - "Анна москва"</li>
                        <li> - "АННА МОСКВА"</li>
                        <li> - "анна москва"</li>
                        <li> - "аннаМосква"</li>
                    </ul>
                    <h1 className='font-bold mt-5 text-sm'>Не допускаются:</h1>
                    <ul className=' mb-5'>
                        <li> -"Москва Анна"</li>
                        <li> - "анна"</li>
                        <li> - "Anna moskva"</li>
                        <li> - "аннна Москвааа"</li>
                        <li> - "Анна Моск" итд</li>
                    </ul>
                </div>
                <div className='lg:w-[500px] border rounded-md p-2'>
                    <h1 className='font-bold text-sm'>
                        Клиент перестанет считаться привлеченным, если выполнено одно из следующих условий:
                    </h1>
                    <ul className=''>
                        <li> - количество заказов достигло 10;</li>
                        <li> - сумма кэшбека (ваш %) достигла 50 000;</li>
                        <li> - срок заказа составил 2 месяца.</li>
                    </ul>
                    <p className='font-bold mt-5'>Условия будут пересматриваться и корректироваться каждые 60 дней </p>
                    <h1 className='text-sm'>Будут меняться %, сроки, кол-во заказов и общая сумма, в большую или меньшую сторону исходя из возможностей отделов и техподдержки.</h1>
                </div>
            </div>
            <table className='border lg:table lg:text-[12px] text-[7px] w-full lg:text-center p-4'>
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
                        datas.map(elem => (
                            <tr key={elem._id} className={`border ${elem.status ? 'text-green-400' : 'text-red-400'}`}>
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
