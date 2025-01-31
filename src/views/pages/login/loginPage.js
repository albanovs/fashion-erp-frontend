import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://fashion-backend-r8hh.onrender.com/test/logins", {
                username,
                password
            });

            if (response.status === 200) {
                const rolesData = response.data;
                localStorage.setItem('roles', JSON.stringify(rolesData));
                navigate('/dashboard');
                window.location.reload();
            } else {
                setError('Неверное имя пользователя или пароль');
            }
        } catch (error) {
            setError('Неверное имя пользователя или пароль');
            console.error(error.response);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-96">
                <div className="mb-4 flex gap-2 items-center justify-center">
                    <h2 className="text-2xl text-black font-semibold">Вход</h2>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium">Логин</label>
                        <input
                            autoComplete='off'
                            type="text"
                            id="email"
                            name="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full text-black py-2 px-3 border bg-inherit border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                            placeholder="example@gmail.com"
                        />
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">Пароль</label>
                        </div>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                autoComplete='off'
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-black py-2 px-3 bg-inherit border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                                placeholder="Пароль"
                            />
                            <span
                                className="absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? 'Скрыть' : 'Показать'}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Войти
                    </button>
                </div>
                <div className="mt-4 text-[10px] text-center">
                    <p>Нет аккаунта ? <br /> обратитесь к тех поддержке команды fashion rynok</p>
                </div>
            </div>
        </div>
    );
};
