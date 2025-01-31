import React, { useEffect, useState } from 'react';
import DashboardStats from '../../../../features/dashboard/components/DashboardStats';
import TitleCard from '../../../../components/Cards/TitleCard';
import { api } from '../../../../Api';
import LoadAnimate from '../../../components/UI/loadanimate';
import ConfirmationModal from './ConfirmationModal';
import ExpensesTable from './components/exences-tables';

export default function ParishesPage() {
    const [expenses, setExpenses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const statsData = [
        { title: "итог дня", value: 0, description: "" },
        { title: "итог недели", value: 0, description: "" },
        { title: "итог месяц", value: expenses.length && expenses[0].month_result || 0, description: "" },
        { title: "итог год", value: 0, description: "" },
    ];

    const fetchExpensesData = async () => {
        try {
            const response = await api.get('/expences-datas');
            setExpenses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExpensesData();
    }, []);

    const handleExpenseClick = (expense) => {
        setSelectedExpense(expense);
        setModalVisible(true);
    };

    const handleConfirmExpense = async () => {
        try {
            await api.patch(`/expenses/${selectedExpense._id}`, selectedExpense);
            fetchExpensesData();
        } catch (error) {
            console.log(error);
        }
        setModalVisible(false);
    };

    const handleCancelExpense = () => {
        setModalVisible(false);
    };

    const [tempExpenseAmounts, setTempExpenseAmounts] = useState({});

    const handleFullfilmentInputChange = (e, monthIndex, fullfilmentIndex, date, type) => {
        const { value } = e.target;
        const key = `${type}-${monthIndex}-${fullfilmentIndex}-${date}`;
        setTempExpenseAmounts(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleFullfilmentChange = async (monthIndex, fullfilmentIndex, date, type) => {
        const expenseToUpdate = expenses[monthIndex][type][fullfilmentIndex].expenses.find(exp => exp.date === date);
        const amountToUpdate = parseInt(tempExpenseAmounts[`${type}-${monthIndex}-${fullfilmentIndex}-${date}`]);
        if (!isNaN(amountToUpdate) && amountToUpdate !== '') {
            try {
                await api.patch(`/expenses/${expenses[monthIndex]._id}/${type}/${expenseToUpdate._id}`, {
                    date,
                    amount: amountToUpdate
                });
                const updatedExpenses = [...expenses];
                updatedExpenses[monthIndex][type][fullfilmentIndex].expenses.find(exp => exp.date === date).amount = amountToUpdate;
                setExpenses(updatedExpenses);
                fetchExpensesData()
            } catch (error) {
                console.log(error);
            }
        }
    };


    const renderTable = () => {
        if (expenses.length === 0) {
            return <div><LoadAnimate /></div>;
        }

        const allDates = expenses.flatMap(month =>
            month.departmentExpenses.flatMap(department =>
                department.expenses.map(expense => expense.date)
            )
        );
        const uniqueDates = [...new Set(allDates)];

        return (
            <table className='table w-full text-[12px]'>
                <thead>
                    <tr>
                        <th>дата</th>
                        {uniqueDates.map(date => <th key={date}>{date}</th>)}
                    </tr>
                </thead>
                <tbody><tr><th className='text-green-300'>Отделы</th><td className='bg-green-300' colSpan={uniqueDates.length}></td></tr></tbody>
                <tbody>
                    {expenses.map((month, monthIndex) => (
                        <React.Fragment key={monthIndex}>
                            {month.departmentExpenses.map((department, departmentIndex) => (
                                <tr key={`${monthIndex}-${departmentIndex}`}>
                                    <th>{department.names}</th>
                                    {uniqueDates.map(date => {
                                        const expense = department.expenses.find(exp => exp.date === date);
                                        return (
                                            <td key={date}
                                                style={{
                                                    backgroundColor: expense && expense.visible ? '#aeff79' : !expense.amount ? "" : '#ffaca6'
                                                }}
                                                onClick={() => expense.visible ? "" : !expense.amount ? "" : handleExpenseClick(expense)}>
                                                {expense ? expense.amount : '-'}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
                <tbody><tr><th className='text-green-300'>Фуллфилмент</th><td className='bg-green-300' colSpan={uniqueDates.length}></td></tr></tbody>
                <ExpensesTable
                    expenses={expenses}
                    uniqueDates={uniqueDates}
                    tempExpenseAmounts={tempExpenseAmounts}
                    handleInputChange={handleFullfilmentInputChange}
                    handleChange={handleFullfilmentChange}
                    type="fullfilments"
                />
                <tbody><tr><th className='text-green-300'>Офисные расходы</th><td className='bg-green-300' colSpan={uniqueDates.length}></td></tr></tbody>
                <ExpensesTable
                    expenses={expenses}
                    uniqueDates={uniqueDates}
                    tempExpenseAmounts={tempExpenseAmounts}
                    handleInputChange={handleFullfilmentInputChange}
                    handleChange={handleFullfilmentChange}
                    type="others"
                />
                <tbody><tr><th className='text-green-300'>Руководители</th><td className='bg-green-300' colSpan={uniqueDates.length}></td></tr></tbody>
                <ExpensesTable
                    expenses={expenses}
                    uniqueDates={uniqueDates}
                    tempExpenseAmounts={tempExpenseAmounts}
                    handleInputChange={handleFullfilmentInputChange}
                    handleChange={handleFullfilmentChange}
                    type="teamleaders"
                />
            </table >
        );
    };

    return (
        <div>
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6 mb-10">
                {statsData.map((d, k) => (
                    <DashboardStats key={k} {...d} colorIndex={k} />
                ))}
            </div>
            <TitleCard title={"Перечень доходов"}>
                <div className='flex justify-between'>
                    <div className='w-full overflow-x-auto'>
                        {renderTable()}
                    </div>
                </div>
            </TitleCard>
            {modalVisible && (
                <ConfirmationModal
                    expense={selectedExpense}
                    onConfirm={handleConfirmExpense}
                    onCancel={handleCancelExpense}
                />
            )}
        </div>
    );
}