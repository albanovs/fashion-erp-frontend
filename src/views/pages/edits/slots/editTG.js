import { CCard } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { api } from 'src/api';

export default function EditTelegram() {
    const [inputValues, setInputValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const [loadingBtn, setLoadingBtn] = useState(true);
    const [channel, setChannel] = useState({
        names: '',
        link: ''
    });
    const [addBtnDisabled, setAddBtnDisabled] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/test/telegramSlot');
            setResponseData(response.data);

            const initialInputValues = {};
            response.data.forEach(elem => {
                initialInputValues[elem._id] = {
                    monako: elem.monako || "",
                    fenix: elem.fenix || "",
                    turan: elem.turan || "",
                };
            });
            setLoading(true);
            setLoadingBtn(true);
            setInputValues(initialInputValues);
            setAddBtnDisabled(false);
        } catch (error) {
            console.error(error);
        }
    };

    const addBtn = async () => {
        setAddBtnDisabled(true);
        if (channel.names && channel.link) {
            try {
                await api.post('/insert/telegram', {
                    account: channel.link,
                    account_ru: channel.names
                });
                setChannel({ names: '', link: '' });
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleSubmit = async () => {
        setLoadingBtn(false);
        try {
            await Promise.all(
                responseData.map(elem =>
                    api.patch(`/test/telegramSlot/${elem._id}`, {
                        monako: inputValues[elem._id]?.monako || elem.monako,
                        fenix: inputValues[elem._id]?.fenix || elem.fenix,
                        turan: inputValues[elem._id]?.turan || elem.turan,
                    })
                )
            );
            fetchData();
            window.location.reload()
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingBtn(true);
        }
    };

    return (
        <div>
            {loading ? (
                <CCard className="mb-4 p-4">
                    <div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-5">
                                <div className="lg:w-40 w-20 lg:h-10 h-5 rounded-xl bg-green-300"></div>
                                <span className="text-[6px] lg:text-sm">- Свободные слоты</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="lg:w-40 w-20 lg:h-10 h-5 rounded-xl bg-red-300"></div>
                                <span className="text-[6px] lg:text-sm">- Слот недоступен</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="lg:w-40 w-20 lg:h-10 h-5 rounded-xl bg-amber-200"></div>
                                <span className="text-[6px] lg:text-sm">- Слот за счет видео</span>
                            </div>
                        </div>

                        <table className="w-full mt-5 lg:text-sm text-[6px] text-center">
                            <thead>
                                <tr>
                                    <th>Каналы</th>
                                    <th>№</th>
                                    <th>Монако</th>
                                    <th>Ильяс</th>
                                    <th>Туран</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responseData.map(elem => (
                                    <tr key={elem._id}>
                                        {elem.num === 1 && (
                                            <th
                                                rowSpan="20"
                                                className="text-blue-500 border"
                                            >
                                                <a href={`https://t.me/${elem.account}`}>
                                                    {elem.account_ru}
                                                </a>
                                            </th>
                                        )}
                                        <td className="border">{elem.num}</td>
                                        {['monako', 'fenix', 'turan'].map(field => (
                                            <td
                                                key={field}
                                                className={`border ${elem[field] === 'слот недоступен'
                                                    ? 'bg-rose-300'
                                                    : elem[field] === 'доступный слот'
                                                        ? 'bg-emerald-300'
                                                        : elem[field]?.includes('видео')
                                                            ? 'bg-yellow-200'
                                                            : ''
                                                    }`}
                                            >
                                                <input
                                                    className={`outline-none bg-inherit w-full text-center lg:text-[10px] text-[6px] ${inputValues[elem._id]?.[field] ===
                                                        'слот недоступен'
                                                        ? 'bg-rose-300'
                                                        : inputValues[elem._id]?.[field] ===
                                                            'доступный слот'
                                                            ? 'bg-emerald-300'
                                                            : inputValues[elem._id]?.[field]?.includes(
                                                                'видео'
                                                            )
                                                                ? 'bg-yellow-200'
                                                                : ''
                                                        }`}
                                                    name={field}
                                                    placeholder="Слот пуст"
                                                    type="text"
                                                    autoComplete="off"
                                                    value={inputValues[elem._id]?.[field] || ''}
                                                    onChange={e => {
                                                        setInputValues(prevState => ({
                                                            ...prevState,
                                                            [elem._id]: {
                                                                ...(prevState[elem._id] || {}),
                                                                [field]: e.target.value || '',
                                                            },
                                                        }));
                                                    }}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-between mt-5">
                            <div className="flex flex-col gap-2">
                                <label>
                                    Название канала/группы
                                    <input
                                        type="text"
                                        className="block w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                                        value={channel.names}
                                        onChange={e =>
                                            setChannel({
                                                ...channel,
                                                names: e.target.value,
                                            })
                                        }
                                    />
                                </label>
                                <label>
                                    Ссылка канала/группы
                                    <input
                                        type="text"
                                        className="block w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
                                        value={channel.link}
                                        onChange={e =>
                                            setChannel({
                                                ...channel,
                                                link: e.target.value,
                                            })
                                        }
                                    />
                                </label>
                                <button
                                    onClick={addBtn}
                                    type="button"
                                    disabled={addBtnDisabled}
                                    className={`bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 ${addBtnDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Добавить
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="mt-5 bg-blue-500 p-2 rounded-md text-white font-semibold mb-10 fixed bottom-3 right-5"
                            >
                                {loadingBtn ? 'Изменить' : 'Сохранение...'}
                            </button>
                        </div>
                    </div>
                </CCard>
            ) : (
                <p>Загрузка данных...</p>
            )}
        </div>
    );
}
