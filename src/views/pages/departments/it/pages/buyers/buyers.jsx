import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBuyerRaiting } from 'src/app/slices/raiting'
import { CCard, CCardHeader } from '@coreui/react'
import { FaUserGear, FaUsersGear } from "react-icons/fa6";
import DashboardStats from './DashboardStats';


export default function Buyers() {

    const dispatch = useDispatch()

    useEffect(() => {
        if (status_buyer == 'idle') {
            dispatch(fetchBuyerRaiting())
        }
    }, [dispatch])

    const { buyerRaiting, status_buyer } = useSelector((state) => state.raiting)

    const buyerZero = buyerRaiting?.filter(elem => elem.coeff === 0)

    const statsData = [
        { title: "Кол-во байеров", value: buyerRaiting?.length, icon: <FaUsersGear className='w-8 h-8' />, description: "" },
        { title: "Кол-во байер с нулевым коэфф", value: buyerZero?.length, icon: <FaUserGear className='w-8 h-8' />, description: "" },
    ]

    return (
        <div>
            <div className="grid lg:grid-cols-2 mt-2 mb-10 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div>
            <div className='mb-10'>
                <CCard>
                    <CCardHeader>Топ 15 байеров</CCardHeader>
                    <table className='w-full'>
                        <thead className="">
                            <tr className="">
                                <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">топ</th>
                                <th className="lg:w-80 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                                <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">отдел</th>
                                <th className="lg:w-10 lg:px-3 lg:py-3 text-left lg:text-[10px] text-[6px] font-medium text-gray-500 uppercase tracking-wider">коефф</th>
                                <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">на кассу</th>
                                <th className="lg:w-60 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">Куратор</th>
                                <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">дата регистрации</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                buyerRaiting?.map((item, index) => (
                                    index <= 14 && <tr key={index}>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{index + 1}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.name}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.team}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.coeff}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.summa}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.curator}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.data_register}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </CCard>
            </div>
            <div className='mb-10 mt-10'>
                <CCard>
                    <CCardHeader>Байеры с 0 коефф</CCardHeader>
                    <table className='w-full'>
                        <thead className="sticky top-0  z-50">
                            <tr className="">
                                <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">топ</th>
                                <th className="lg:w-80 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                                <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">отдел</th>
                                <th className="lg:w-10 lg:px-3 lg:py-3 text-left lg:text-[10px] text-[6px] font-medium text-gray-500 uppercase tracking-wider">коефф</th>
                                <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">на кассу</th>
                                <th className="lg:w-60 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">Куратор</th>
                                <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">дата регистрации</th>
                            </tr>
                        </thead>
                    </table>
                    <div className='w-full min-h-[200px] max-h-[400px] overflow-y-auto'>
                        <table className='w-full'>
                            <tbody>
                                {
                                    buyerRaiting?.map((item, index) => (
                                        item.coeff === 0 && < tr key={index} >
                                            <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{index + 1}</td>
                                            <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.name}</td>
                                            <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.team}</td>
                                            <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.coeff}</td>
                                            <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.summa}</td>
                                            <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.curator}</td>
                                            <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.data_register}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </CCard >
            </div>
            <CCard>
                <CCardHeader>Список всех байер</CCardHeader>
                <table className='w-full'>
                    <thead className="sticky top-0 z-50">
                        <tr className="">
                            <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">топ</th>
                            <th className="lg:w-80 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                            <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">отдел</th>
                            <th className="lg:w-10 lg:px-3 lg:py-3 text-left lg:text-[10px] text-[6px] font-medium text-gray-500 uppercase tracking-wider">коефф</th>
                            <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">на кассу</th>
                            <th className="lg:w-60 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">Куратор</th>
                            <th className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">дата регистрации</th>
                        </tr>
                    </thead>
                </table>
                <div className='w-full min-h-[200px] max-h-[400px] overflow-y-auto'>
                    <table className='w-full'>
                        <tbody>
                            {
                                buyerRaiting?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{index + 1}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.name}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.team}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.coeff}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.summa}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.curator}</td>
                                        <td className="lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.data_register}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </CCard>
        </div >
    )
}