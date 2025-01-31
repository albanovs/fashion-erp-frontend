import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchProfitDatas } from '../../../../../app/slices/incoming-outging/outgoing';

export default function HistoryProfitTwo() {
    const currentYear = new Date().getFullYear().toString();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [loading, setLoading] = useState(true);
    const expencesDatas = useSelector(state => state.profitOtchetTwo.profit);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(fetchProfitDatas());
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const uniqueYears = [...new Set(expencesDatas.map(item => item.data.split('.')[1]))];

    if (!uniqueYears.includes(currentYear)) {
        uniqueYears.push(currentYear);
    }

    const filteredExpences = selectedYear
        ? expencesDatas.filter(item => item.data.split('.')[1] === selectedYear)
        : expencesDatas;

    return (
        <div>
            <button
                className="btn bg-slate-500 text-white mb-10 px-4 py-2 rounded hover:bg-slate-600 transition duration-200"
                onClick={() => window.history.back()}
            >
                Назад
            </button>
            <div className="mb-4">
                <label htmlFor="year" className="mr-2">Выберите год: </label>
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                    {uniqueYears.sort().map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div className="grid lg:grid-cols-4 gap-4">
                {loading ? (
                    <div>Загрузка данных...</div>
                ) : filteredExpences.length > 0 ? (
                    filteredExpences.map((item, index) => (
                        <NavLink
                            className='lg:px-20 px-2 py-2 bg-white dark:bg-gray-700 rounded-md flex items-center gap-3 shadow-md'
                            key={index}
                            to={`/two/profit-details/${item._id}`}>
                            {item.data}
                        </NavLink>
                    ))
                ) : (
                    <div>Пока нет данных</div>
                )}
            </div>
        </div>
    );
}