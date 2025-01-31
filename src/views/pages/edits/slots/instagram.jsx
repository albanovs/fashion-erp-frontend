import React from 'react'
import { useEffect, useState } from 'react';
import { CCard } from '@coreui/react';
import { api } from 'src/api';

export default function EditInstagram() {

    const [inputValues, setInputValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);

    const handleInputChange = async (e, elemId, fieldName) => {
        const newValue = e.target.value !== '' ? e.target.value : '';
        setInputValues((prevState) => ({
            ...prevState,
            [elemId]: {
                ...(prevState[elemId] || {}),
                [fieldName]: newValue,
            },
        }));
        try {
            await api.patch(`/test/mymodels/${elemId}`, {
                [fieldName]: newValue,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await api.get('/test/mymodels');
            setResponseData(response.data);

            const initialInputValues = {};
            response.data.forEach(elem => {
                initialInputValues[elem._id] = {
                    monako: elem.monako || "",
                    fenix: elem.fenix || "",
                    turan: elem.turan || "",
                };
            });
            setLoading(true)
            setInputValues(initialInputValues);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])


    const addBtn = async (e) => {
        var req = prompt("Напишите инстаграм аккаунт");

        if (req) {
            try {
                const response = await api.post('/insert/account', {
                    account: req
                });
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div>
            {
                loading ? (
                    <CCard className="mt-2 mb-4 p-4">
                        <div className="flex flex-col gap-5 mb-5">
                            <div className="flex items-center gap-5">
                                <div className="lg:w-40 w-20 lg:h-10 h-5 rounded-xl bg-green-300 inline-block"></div>
                                <span className="text-[6px] lg:text-sm"> - свободные слоты</span>
                            </div> <div className="flex items-center gap-5">
                                <div className="lg:w-40 w-20 lg:h-10 h-5 rounded-xl bg-red-300 inline-block"></div>
                                <span className="text-[6px] lg:text-sm"> - слот недоступен</span>
                            </div> <div className="flex items-center gap-5">
                                <div className="lg:w-40 w-20 lg:h-10 h-5 rounded-xl bg-amber-200 inline-block"></div>
                                <span className="text-[6px] lg:text-sm"> - слот за счет видео</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="lg:table w-full ">
                                <thead className="lg:text-[16px] lg:text-center text-start text-[8px]">
                                    <tr>
                                        <th>Аккаунты</th>
                                        <th>Монако</th>
                                        <th>ильяс</th>
                                        <th>Туран</th>
                                    </tr>
                                </thead>
                                <tbody className="lg:text-sm text-[6px]">
                                    {
                                        responseData.map(elem => (
                                            <tr className="border-gray-200">
                                                {elem.num === 1 && <td rowSpan={5} className="border p-3 text-blue-500 cursor-pointer hover:underline"><a href={`https://instagram.com/${elem.account}`}> {elem.account}</a></td>}

                                                <td className="border lg:p-5 text-center">
                                                    <input
                                                        className={`outline-none bg-inherit w-full ${inputValues[elem._id]?.monako === 'слот недоступен' ? 'bg-rose-300' : inputValues[elem._id]?.monako === 'доступный слот' ? 'bg-emerald-300' : inputValues[elem._id]?.monako?.includes('видео') ? 'bg-yellow-200' : ''} text-center lg:text-[10px] text-[6px]`}
                                                        name='lider'
                                                        placeholder='Слот пуст'
                                                        type='text'
                                                        autocomplete="off"
                                                        value={inputValues[elem._id]?.monako || ''}
                                                        onChange={(e) => handleInputChange(e, elem._id, 'monako')}
                                                    />
                                                </td>
                                                <td className="border lg:p-5 text-center">
                                                    <input
                                                        className={`outline-none bg-inherit w-full ${inputValues[elem._id]?.fenix === 'слот недоступен' ? 'bg-rose-300' : inputValues[elem._id]?.fenix === 'доступный слот' ? 'bg-emerald-300' : inputValues[elem._id]?.fenix?.includes('видео') ? 'bg-yellow-200' : ''} text-center lg:text-[10px] text-[6px]`}
                                                        name='fenix'
                                                        placeholder='Слот пуст'
                                                        type='text'
                                                        autocomplete="off"
                                                        value={inputValues[elem._id]?.fenix || ''}
                                                        onChange={(e) => handleInputChange(e, elem._id, 'fenix')}
                                                    />
                                                </td>
                                                <td className="border lg:p-5 text-center">
                                                    <input
                                                        className={`outline-none bg-inherit w-full ${inputValues[elem._id]?.turan === 'слот недоступен' ? 'bg-rose-300' : inputValues[elem._id]?.turan === 'доступный слот' ? 'bg-emerald-300' : inputValues[elem._id]?.turan?.includes('видео') ? 'bg-yellow-200' : ''} text-center lg:text-[10px] text-[6px]`}
                                                        name='turan'
                                                        placeholder='Слот пуст'
                                                        type='text'
                                                        autocomplete="off"
                                                        value={inputValues[elem._id]?.turan || ''}
                                                        onChange={(e) => handleInputChange(e, elem._id, 'turan')}
                                                    />
                                                </td>

                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div>
                                <div className='flex justify-between'>
                                    <button type='button' onClick={addBtn} className='mt-5 text-sm flex items-center border p-3 text-white bg-indigo-600 mb-10'>Добавить аккаунт</button>
                                </div>
                            </div>
                        </div>
                    </CCard>
                ) : (
                    <div className='w-full gap-2 flex-col flex justify-center items-center'><svg aria-hidden="true" class="w-6 h-6  text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>загружаем данных, просим подождать</div>
                )
            }
        </div>
    )
}