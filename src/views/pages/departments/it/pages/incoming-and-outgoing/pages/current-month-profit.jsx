import React, { useEffect, useState } from 'react';
import ExpensesTable from './components/expences';
import { api } from '../../../../../Api';

export default function CurrentMonthProfitTwo() {
    const [expenses, setExpenses] = useState([]);
    const [dailyTotal, setDailyTotal] = useState(0);
    const [weeklyTotal, setWeeklyTotal] = useState(0);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoryType, setCategoryType] = useState('nomination');
    const [categoryToDelete, setCategoryToDelete] = useState('');


    const formatDateToDDMMYYYY = (date) => {
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    };

    const calculateDailyTotal = (expenses) => {
        const today = new Date();
        const todayFormatted = formatDateToDDMMYYYY(today);

        let total = 0;

        expenses.forEach(month => {
            month.nomination.forEach(nom => {
                nom.expenses.forEach(exp => {
                    if (exp.date === todayFormatted) {
                        total += exp.amount;
                    }
                });
            });
        });

        return total;
    };

    const calculateWeeklyTotal = (expenses) => {
        const today = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);

        const todayFormatted = formatDateToDDMMYYYY(today);
        const oneWeekAgoFormatted = formatDateToDDMMYYYY(oneWeekAgo);

        let total = 0;

        expenses.forEach(month => {
            month.nomination.forEach(nom => {
                nom.expenses.forEach(exp => {
                    if (exp.date >= oneWeekAgoFormatted && exp.date <= todayFormatted) {
                        total += exp.amount;
                    }
                });
            });
        });

        return total;
    };

    const statsData = [
        { title: "итог дня", value: dailyTotal, description: "" },
        { title: "итог недели", value: weeklyTotal, description: "" },
        { title: "итог месяц", value: expenses.length && expenses[0].month_result || 0, description: "" },
        { title: "итог год", value: 0, description: "" },
    ];

    const fetchExpensesData = async () => {
        try {
            const response = await api.get('/profit-datas');
            const fetchedExpenses = response.data;
            setExpenses(fetchedExpenses);
            setDailyTotal(calculateDailyTotal(fetchedExpenses));
            setWeeklyTotal(calculateWeeklyTotal(fetchedExpenses));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExpensesData();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await api.post('/profit/add-category', { names: newCategoryName, type: categoryType });
            setNewCategoryName('');
            setCategoryType('nomination');
            fetchExpensesData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCategory = async (categoryId, type) => {
        try {
            await api.delete('/profit/delete-category', {
                data: { categoryId, type }
            });
            fetchExpensesData();
        } catch (error) {
            console.log(error);
        }
    };

    const [tempExpenseAmounts, setTempExpenseAmounts] = useState({});

    const handleInputChange = (e, monthIndex, expenseIndex, date, type) => {
        const { value } = e.target;
        const key = `${type}-${monthIndex}-${expenseIndex}-${date}`;
        setTempExpenseAmounts(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleAmountChange = async (monthIndex, expenseIndex, date, type) => {
        const amountToUpdate = parseInt(tempExpenseAmounts[`${type}-${monthIndex}-${expenseIndex}-${date}`]);
        try {
            const expenseToUpdate = expenses[monthIndex][type][expenseIndex].expenses.find(exp => exp.date === date);
            await api.patch(`/profit/${expenses[monthIndex]._id}/${type}/${expenseToUpdate._id}`, {
                date,
                amount: amountToUpdate || 0
            });
            const updatedExpenses = [...expenses];
            updatedExpenses[monthIndex][type][expenseIndex].expenses.find(exp => exp.date === date).amount = amountToUpdate;
            setExpenses(updatedExpenses);
            setDailyTotal(calculateDailyTotal(updatedExpenses));
            setWeeklyTotal(calculateWeeklyTotal(updatedExpenses));
            fetchExpensesData();
        } catch (error) {
            console.log(error);
        }
    };

    const renderTable = () => {
        if (expenses.length === 0) {
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
                <ExpensesTable
                    expenses={expenses}
                    uniqueDates={uniqueDates}
                    tempExpenseAmounts={tempExpenseAmounts}
                    handleInputChange={handleInputChange}
                    handleAmountChange={handleAmountChange}
                    handleDeleteCategory={handleDeleteCategory}
                    type="nomination"
                />
            </table>
        );
    };

    return (
        <div>
            <h1 className='bg-white dark:bg-gray-800 p-4 shadow rounded-lg text-center mb-5 text-xl'>Перечень прибыли</h1>
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
            <form onSubmit={handleAddCategory} className="my-4 ">
                <div className="mb-4">
                    <label htmlFor="new-category-name" className="block text-sm font-medium text-gray-700">Новое наименование:</label>
                    <input
                        type="text"
                        id="new-category-name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Добавить категорию
                </button>
            </form>
        </div>
    );
}