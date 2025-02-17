import React from 'react'

export default function DateSearch({ data, searchValue }) {

    return (
        <div>
            {
                data.map(elem => {
                    if (elem.date === searchValue) {
                        return (
                            <>
                                <table key={elem._id} className='"lg:min-w-full w-full lg:text-[11px] text-[5px]  text-center'>
                                    <thead className='bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
                                        <tr>
                                            <th className="lg:py-1 lg:px-3 border" rowSpan="3">№</th>
                                            <th className="lg:py-1 lg:px-3 border" colSpan="3">Комиссия</th>
                                            <th className="lg:py-1 lg:px-3 border" rowSpan="3">СМ</th>
                                            <th className="lg:py-1 lg:px-3 border">100%</th>
                                            <th className="lg:py-1 lg:px-3 border">40%</th>
                                            <th className="lg:py-1 lg:px-3 border">20%</th>
                                            <th className="lg:py-1 lg:px-3 border">40%</th>
                                            <th className="lg:py-1 lg:px-2 border" colSpan="4">Итоги</th>
                                        </tr>
                                        <tr>
                                            <th className="lg:py-1 lg:px-2 border" colSpan="3">Индекс</th>
                                            <th className="lg:py-1 lg:px-2 border">100%</th>
                                            <th className="lg:py-1 lg:px-2 border">34%</th>
                                            <th className="lg:py-1 lg:px-2 border">33%</th>
                                            <th className="lg:py-1 lg:px-2 border">33%</th>
                                            <th className="lg:py-1 lg:px-2 border" rowSpan="2">Уход</th>
                                            <th className="lg:py-1 lg:px-2 border" rowSpan="2">Приход</th>
                                            <th className="lg:py-1 lg:px-2 border" rowSpan="2">Итог (+40 отправка)</th>
                                            <th className="lg:py-1 lg:px-2 border" rowSpan="2">Итог индекс</th>
                                        </tr>
                                        <tr>
                                            <th className="lg:py-1 lg:px-2 border lg:w-[200px]">Имя и Город</th>
                                            <th className="lg:py-1 lg:px-2 border">Админ</th>
                                            <th className="lg:py-1 lg:px-2 border">байер</th>
                                            <th className="lg:py-1 lg:px-2 border" colSpan="5"></th>
                                        </tr>
                                    </thead>
                                    {elem.otchet.map((elem, index) => {
                                        const shouldRenderItem =
                                            elem.sity !== '' &&
                                            elem.comPersent100 !== 0;
                                        const isOdd = index % 2 === 1;
                                        if (shouldRenderItem) {
                                            return (
                                                <tbody key={elem._id}>
                                                    <tr>
                                                        <td className="border lg:py-1 lg:px-3" rowSpan="2">
                                                            {index}
                                                        </td>
                                                        <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                            {elem.sity}
                                                        </td>
                                                        <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
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
                                                        <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                            {elem.prihod === 0 ? '' : elem.prihod}
                                                        </td>
                                                        <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                            {elem.itog}
                                                        </td>
                                                        <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'} rowSpan="2">
                                                            {elem.itogIndex === 0 ? '' : elem.itogIndex}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'}>
                                                            {elem.indexPersent100 === 0 ? '' : elem.indexPersent100}
                                                        </td>
                                                        <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'}>
                                                            {elem.indexPersent2 === 0 ? '' : elem.indexPersent2}
                                                        </td>
                                                        <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'}>
                                                            {elem.indexPersent3 === 0 ? '' : elem.indexPersent3}
                                                        </td>
                                                        <td className={isOdd ? "border lg:py-1 lg:px-3 text-center" : 'p-1 text-center border lg:py-1 lg:px-3'}>
                                                            {elem.indexPersent4}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
                                        }
                                    }
                                    )}
                                </table>
                                <table className="mx-auto mt-10 mb-10 lg:min-w-full w-[300px]  lg:text-[12px] text-[5px] text-center">
                                    <thead className="">
                                        <tr>
                                            <th className='border' >росходы</th>
                                            <th className='border' >сумма</th>
                                        </tr>
                                    </thead>
                                    {
                                        elem.itog.map((elem, index) => {
                                            return (
                                                <tbody key={elem._id} className='lg:text-[12px] text-[5px]'>
                                                    <tr>
                                                        <td className='border'>
                                                            {elem.ros1}
                                                        </td>
                                                        <td className='border'>
                                                            {elem.sum1}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border'>
                                                            {elem.ros2}
                                                        </td>
                                                        <td className='border'>
                                                            {elem.sum2}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border'>
                                                            {elem.ros3}
                                                        </td>
                                                        <td className='border'>
                                                            {elem.sum3}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border'>
                                                            {elem.ros4}
                                                        </td>
                                                        <td className='border'>
                                                            {elem.sum4}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border'>
                                                            {elem.ros5}
                                                        </td>
                                                        <td className='border'>
                                                            {elem.sum5}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan='2' className='bg-gradient-to-r from-blue-500 to-purple-500 text-white'>итоги</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border'>индекс:</td>
                                                        <td className='border'>{elem.allItogIndex}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border '>касса:</td>
                                                        <td className='border'>{elem.allItog}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border'>приход:</td>
                                                        <td className='border'>{elem.allItogPrihod}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border'>уход:</td>
                                                        <td className='border'>{elem.allItogUhod}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border'>кэшбек 10%:</td>
                                                        <td className='border'>{elem.raznica}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan='2' className='bg-gradient-to-r from-blue-500 to-purple-500 font-semibold p-2 text-sm text-white'>общий итог: {elem.itogs} </td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                    }
                                </table>
                            </>
                        )
                    }
                })
            }
        </div>
    )
}
