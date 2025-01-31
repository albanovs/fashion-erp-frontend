import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ExpensesTableViews from './expences-views';
import { fetchProfitDatas } from '../../../../../../app/slices/incoming-outging/outgoing';

export default function HistoryProfitDetailsTwo() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const expensesDatas = useSelector(state => state.profitOtchetTwo.profit);
    const expenses = expensesDatas.filter(item => item._id === id);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(fetchProfitDatas());
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    const statsData = [
        { title: "итог месяц", value: expenses?.length && expenses[0]?.month_result || 0, description: "" },
    ];

    const renderTable = () => {
        if (expenses?.length === 0) {
            return <div>Загрузка...</div>;
        }

        const allDates = expenses.flatMap(month =>
            month.nomination.flatMap(nom =>
                nom.expenses.map(exp => exp.date)
            )
        );

        const uniqueDates = [...new Set(allDates)];

        return (
            <table className='table bg-white dark:bg-gray-700 w-full text-[12px]'>
                <thead>
                    <tr>
                        <th className='sticky w-10 left-0 bg-white dark:bg-gray-800'>дата</th>
                        {uniqueDates.map(date => <th key={date}>{date}</th>)}
                    </tr>
                </thead>
                <tr>
                    <th className='text-green-300 sticky left-0 bg-white dark:bg-gray-800'>Наименование</th>
                    <td className='bg-green-100' colSpan={uniqueDates.length}></td>
                </tr>
                <ExpensesTableViews
                    expenses={expenses}
                    uniqueDates={uniqueDates}
                    type="nomination"
                />
            </table>
        );
    };

    return (
        <div>
            <button
                className="btn bg-slate-500 text-white mb-10 px-4 py-2 rounded hover:bg-slate-600 transition duration-200"
                onClick={() => window.history.back()}
            >
                Назад
            </button>
            <h1 className='bg-white p-4 shadow rounded-lg text-center mb-5 text-xl dark:bg-gray-800'>Перечень приходов</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-4 shadow rounded-lg text-center">
                        <h3 className="text-lg font-semibold">{stat.title}</h3>
                        <p className="text-2xl font-bold text-blue-500">{stat.value}</p>
                        <p className="text-gray-500">{stat.description}</p>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='w-full overflow-x-auto'>
                    {renderTable()}
                </div>
            </div>
        </div>
    );
}