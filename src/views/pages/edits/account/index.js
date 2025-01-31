import { CCard } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { api } from 'src/api';

export default function AccountsCreate() {
    const [accounts, setAccounts] = useState([]);
    const [formData, setFormData] = useState({ username: '', password: '', role: '' });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [searchRole, setSearchRole] = useState('');

    const forbiddenRoles = ["root", "root.kairat", "root.turan", "root.ilyas", "root.sim", "root.ilyas"];

    const getAccounts = async () => {
        try {
            const response = await api.get('/test/logins');
            setAccounts(response.data);
        } catch (error) {
            console.error(error);
            setError('Не удалось загрузить аккаунты');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (forbiddenRoles.includes(formData.role.toLowerCase())) {
            setError('Эта роль запрещена. Пожалуйста, выберите другую роль.');
            return;
        }

        try {
            const response = await api.post('/test/register', formData);
            setAccounts([...accounts, formData]);
            setFormData({ username: '', password: '', role: '' });
        } catch (error) {
            console.error(error);
            setError('Ошибка регистрации пользователя');
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/test/login/${selectedAccountId}`);
            setAccounts(accounts.filter((account) => account._id !== selectedAccountId));
            setShowModal(false);
        } catch (error) {
            console.error(error);
            setError('Ошибка при удалении пользователя');
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedAccountId(id);
        setShowModal(true);
    };

    const generatePassword = () => {
        const charset = 'abcdefghijklmnopqrstuvwxyzZ0123456789';
        let password = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        setFormData({ ...formData, password });
    };

    useEffect(() => {
        getAccounts();
    }, []);

    const filteredAccounts = accounts
        .filter((account) => !forbiddenRoles.includes(account.role.toLowerCase()))
        .filter((account) => account.role.toLowerCase().includes(searchRole.toLowerCase()));

    return (
        <CCard className="container mx-auto p-6 min-h-screen">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Регистрация нового пользователя</h2>
                <form onSubmit={handleRegister} className=" p-6 rounded-lg border space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Имя пользователя</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            autoComplete='off'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Пароль</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                autoComplete='off'
                            />
                            <button
                                type="button"
                                className="ml-4 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                                onClick={generatePassword}
                            >
                                Генерировать
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Роль</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            autoComplete='off'
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Зарегистрировать
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            <h1 className="text-2xl font-semibold mb-4 text-gray-700">Управление аккаунтами</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Поиск по роли"
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-10 max-h-96 overflow-y-auto border p-5">
                <ul className="space-y-4">
                    {filteredAccounts.length > 0 ? (
                        filteredAccounts.map((account) => (
                            <li key={account._id} className=" p-4 rounded-lg border flex justify-between items-center">
                                <div>
                                    <p className="text-xl font-semibold text-gray-800">{account.username}</p>
                                    <p className="text-sm text-gray-600">Роль: {account.role}</p>
                                </div>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                                    onClick={() => handleDeleteClick(account._id)}
                                >
                                    Удалить
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Пользователи с указанной ролью не найдены</p>
                    )}
                </ul>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className=" p-6 rounded-lg border">
                        <h3 className="text-xl font-semibold mb-4">Вы уверены, что хотите удалить этого пользователя?</h3>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                onClick={handleDelete}
                            >
                                Да, удалить
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CCard>
    );
}