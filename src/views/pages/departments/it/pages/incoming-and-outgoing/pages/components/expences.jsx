import React, { useState } from "react";

export default function ExpensesTable({
    expenses,
    uniqueDates,
    tempExpenseAmounts,
    handleInputChange,
    handleAmountChange,
    handleDeleteCategory,
    type
}) {
    const [showModal, setShowModal] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    const openModal = (categoryId) => {
        setCategoryIdToDelete(categoryId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCategoryIdToDelete(null);
    };

    const confirmDeleteCategory = () => {
        if (categoryIdToDelete) {
            handleDeleteCategory(categoryIdToDelete, type);
            closeModal();
        }
    };

    return (
        <tbody>
            {expenses.map((month, monthIndex) => (
                <React.Fragment key={monthIndex}>
                    {month[type].map((item, itemIndex) => (
                        <tr key={`${monthIndex}-${itemIndex}`}>
                            <th className="sticky left-0 bg-white dark:bg-gray-800">{item.names}</th>
                            {uniqueDates.map(date => {
                                const expense = item.expenses.find(exp => exp.date === date);
                                const tempAmount = tempExpenseAmounts[`${type}-${monthIndex}-${itemIndex}-${date}`];
                                const displayedAmount = tempAmount !== undefined && tempAmount !== null && !isNaN(tempAmount) && tempAmount !== 0 ? tempAmount.toString() : (expense && expense.amount !== null ? expense.amount.toString() : '');
                                return (
                                    <td key={date}>
                                        <input
                                            className='w-full dark:bg-inherit'
                                            type="text"
                                            value={displayedAmount}
                                            onChange={(e) => handleInputChange(e, monthIndex, itemIndex, date, type)}
                                            onBlur={() => handleAmountChange(monthIndex, itemIndex, date, type)}
                                        />
                                    </td>
                                );
                            })}
                            <td>
                                <button
                                    onClick={() => openModal(item._id)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </React.Fragment>
            ))}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="mb-4">Вы уверены, что хотите удалить эту категорию?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={confirmDeleteCategory}
                                className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
                            >
                                Подтвердить
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </tbody>
    );
}