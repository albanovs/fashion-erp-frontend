import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CSpinner } from '@coreui/react';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './telegram.css';

const TelegramSlot = () => {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const url = 'https://fashion-backend-r8hh.onrender.com';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url + '/test/telegramSlot');
                setResponseData(response.data);
                setLoading(true);
            } catch (error) {
                console.error(error);
                setLoading(true);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Телеграм слоты</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className="mb-3">
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-3" style={{ width: '50px', height: '25px', backgroundColor: '#4CAF50' }}></div>
                                    <span style={{ fontSize: '12px' }}> - свободные слоты</span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-3" style={{ width: '50px', height: '25px', backgroundColor: '#F44336' }}></div>
                                    <span style={{ fontSize: '12px' }}> - слот недоступен</span>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-3" style={{ width: '50px', height: '25px', backgroundColor: '#FFEB3B' }}></div>
                                    <span style={{ fontSize: '12px' }}> - слот за счет видео</span>
                                </div>
                            </div>
                        </div>
                        <CTable borderless className="custom-table">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className="border" >Каналы/Группы</CTableHeaderCell>
                                    <CTableHeaderCell className="border">№</CTableHeaderCell>
                                    <CTableHeaderCell className="border">Монако</CTableHeaderCell>
                                    <CTableHeaderCell className="border">Ильяс</CTableHeaderCell>
                                    <CTableHeaderCell className="border">Туран</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {responseData.map((elem) => (
                                    <CTableRow key={elem._id}>
                                        {elem.num === 1 && (
                                            <CTableDataCell rowSpan="20" className="text-primary border w-full lg:w-20">
                                                <a href={`${elem.account}`} target="_blank" rel="noopener noreferrer">
                                                    <span>{elem.account_ru}</span>
                                                </a>
                                            </CTableDataCell>
                                        )}
                                        <CTableDataCell className="border">{elem.num}</CTableDataCell>
                                        <CTableDataCell className={`text-center border ${elem.monako.toLowerCase() === 'слот недоступен' ? 'bg-danger' : elem.monako === 'доступный слот' ? 'bg-success' : elem.monako.includes('видео') ? 'bg-warning' : ''}`}>{elem.monako}</CTableDataCell>
                                        <CTableDataCell className={`text-center border ${elem.fenix === 'Слот недоступен' ? 'bg-danger' : elem.fenix === 'доступный слот' ? 'bg-success' : elem.fenix.includes('видео') ? 'bg-warning' : ''}`}>{elem.fenix}</CTableDataCell>
                                        <CTableDataCell className={`text-center border ${elem.turan === 'Слот недоступен' ? 'bg-danger' : elem.turan === 'доступный слот' ? 'bg-success' : elem.turan.includes('видео') ? 'bg-warning' : ''}`}>{elem.turan}</CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            ) : (
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <CSpinner color="primary" />
                    <span>Загружаем данные, просим подождать</span>
                </div>
            )}
        </>
    );
};

export default TelegramSlot;