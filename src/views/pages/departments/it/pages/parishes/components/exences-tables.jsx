import React from "react";

export default function ExpensesTable({ expenses, uniqueDates, tempExpenseAmounts, handleInputChange, handleChange, type }) {
    return (
        <tbody>
            {expenses.map((month, monthIndex) => (
                <React.Fragment key={monthIndex}>
                    {month[type].map((item, itemIndex) => (
                        <tr key={`${monthIndex}-${itemIndex}`}>
                            <th>{item.names}</th>
                            {uniqueDates.map(date => {
                                const expense = item.expenses.find(exp => exp.date === date);
                                const tempAmount = tempExpenseAmounts[`${type}-${monthIndex}-${itemIndex}-${date}`];
                                const displayedAmount = tempAmount !== undefined && tempAmount !== null && !isNaN(tempAmount) && tempAmount !== 0 ? tempAmount.toString() : (expense && expense.amount !== null ? expense.amount.toString() : '');
                                return (
                                    <td key={date}>
                                        <input
                                            className='w-full'
                                            type="text"
                                            value={displayedAmount}
                                            onChange={(e) => handleInputChange(e, monthIndex, itemIndex, date, type)}
                                            onBlur={() => handleChange(monthIndex, itemIndex, date, type)}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </React.Fragment>
            ))}
        </tbody>
    );
}