import React from "react";

export default function ExpensesTableViews({
    expenses,
    uniqueDates,
    type
}) {

    return (
        <tbody>
            {expenses.map((month, monthIndex) => (
                <React.Fragment key={monthIndex}>
                    {month[type].map((item, itemIndex) => (
                        <tr key={`${monthIndex}-${itemIndex}`}>
                            <th className="sticky left-0 bg-white dark:bg-gray-800">{item.names}</th>
                            {uniqueDates.map(date => {
                                const expense = item.expenses.find(exp => exp.date === date);
                                return (
                                    <td key={date}>
                                        {expense && expense.amount !== null ? expense.amount.toString() : ''}
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