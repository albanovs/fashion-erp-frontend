import React from 'react'
import TitleCard from '../../../../../components/Cards/TitleCard'

export default function TableManager({ data, title }) {
    return (
        <TitleCard title={title}>
            {
                data?.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-row justify-between items-center my-2'>
                            {item.curator.includes('ВМ') && <h1 className='font-semibold'>Ведущие менеджера: {item.curator}</h1>}
                            {item.curator.includes('ВМ') && <h1 className='font-semibold'> Коэффициент {item.allCoeff}</h1>}
                            {
                                !item.curator.includes('ВМ') && <table className="w-full lg:table lg:text-sm text-[10px]">
                                    <thead>
                                        <tr>
                                            <th className='text-start'>{item.curator}</th>
                                            <th className='text-end'>комиссия 3%: {item.comissionVM}</th>
                                        </tr>
                                    </thead>
                                </table>
                            }
                        </div>
                    )
                }
                )
            }
        </TitleCard>
    )
}