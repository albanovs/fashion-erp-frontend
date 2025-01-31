import React, { useEffect, useState } from 'react';
import { api } from 'src/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManagers } from 'src/app/slices/raiting';
import { CCard } from '@coreui/react';
import LoadAnimate from '../../../components/pages/loading_animate';

export default function Smanager() {
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
    const [selectedManager, setSelectedManager] = useState(null);
    const [withdrawalSumma, setWithdrawalSumma] = useState('');
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [wait, setWait] = useState(false);
    const dispatch = useDispatch();
    const { managers, status_manager, error } = useSelector((state) => state.raiting);

    useEffect(() => {
        const fetchData = async () => {
            setWait(true);
            await dispatch(fetchManagers());
            setWait(false);
        };
        if (status_manager === 'idle') {
            fetchData();
        }
    }, [dispatch]);

    const managerss = managers
        // .filter((manager) => manager.datas === '2024-8')
        ?.filter((manager) => manager.datas === new Date().toISOString().slice(0, 7))
        .flatMap((manager) => manager.managers)
        .filter((manager) => manager.curator.toLowerCase().includes(searchTerm.toLowerCase()));

    const openHistoryModal = (manager) => {
        setSelectedManager(manager);
        setHistory(manager.for_withdrawal);
        setIsHistoryModalOpen(true);
    };

    const closeHistoryModal = () => {
        setIsHistoryModalOpen(false);
        setSelectedManager(null);
    };

    const openWithdrawalModal = (manager) => {
        setSelectedManager(manager);
        setIsWithdrawalModalOpen(true);
    };

    const closeWithdrawalModal = () => {
        setIsWithdrawalModalOpen(false);
        setSelectedManager(null);
        setWithdrawalSumma('');
    };

    const handleWithdrawal = async () => {
        const maxSumma = selectedManager.remainder > 0 ? selectedManager.remainder : selectedManager.comission;

        if (Number(withdrawalSumma) > maxSumma) {
            alert(`Ошибка: сумма не может превышать ${maxSumma}`);
            return;
        }

        setIsLoading(true);
        setWait(true);

        try {
            await api.patch('/raiting-manager-percent', {
                managerId: selectedManager._id,
                summa: parseFloat(withdrawalSumma),
            });
            closeWithdrawalModal();
            window.location.reload();
        } catch (error) {
            console.error("Ошибка при выдаче суммы:", error);
        } finally {
            setIsLoading(false);
            setWait(false);
        }
    };

    return (
        <CCard>
            <div className="container mx-auto p-4">
                <input
                    type="text"
                    placeholder="Поиск по имени..."
                    className="mb-4 p-2 border rounded w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="overflow-auto max-h-[400px] border">
                    <table className="min-w-full table-auto  rounded-lg">
                        <thead className="">
                            <tr>
                                <th className="p-3 text-left">№</th>
                                <th className="p-3 text-left">Имя</th>
                                <th className="p-3 text-left">Байеров</th>
                                <th className="p-3 text-left">Комиссия</th>
                                <th className="p-3 text-left">Остаток</th>
                                <th className="p-3 text-left">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!wait ? (
                                managerss?.map((manager, index) => (
                                    !manager.curator.includes('ВМ') && <tr key={manager._id} className="border-b">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{manager.curator}</td>
                                        <td className="p-3">{manager.buyerLength}</td>
                                        <td className="p-3">{manager.comission}</td>
                                        <td className="p-3">{manager.remainder}</td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => openHistoryModal(manager)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                                            >
                                                История выдачи
                                            </button>
                                            <button
                                                onClick={() => openWithdrawalModal(manager)}
                                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                                            >
                                                Выдать
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border-b p-3 flex justify-center w-full" key="loading" colSpan="6">
                                        <LoadAnimate />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isHistoryModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                            <h2 className="text-xl font-bold mb-4">История выдачи для {selectedManager?.curator}</h2>
                            <ul className="list-disc pl-5">
                                {history.map((item, index) => (
                                    <li key={index}>
                                        Сумма: {item.summa}, Дата: {new Date(item.date).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={closeHistoryModal}
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                )}

                {isWithdrawalModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Выдать сумму для {selectedManager?.curator}</h2>
                            <input
                                type="number"
                                value={withdrawalSumma}
                                onChange={(e) => setWithdrawalSumma(e.target.value)}
                                placeholder="Введите сумму"
                                className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
                                disabled={isLoading}
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleWithdrawal}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        "Подтвердить"
                                    )}
                                </button>
                                <button
                                    onClick={closeWithdrawalModal}
                                    className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                    disabled={isLoading}
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CCard>
    );
}