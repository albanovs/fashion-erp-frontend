import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardText, CCol, CProgress, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react/dist/esm";
import { NavLink } from "react-router-dom";
import './utils.css'
import { UniversalModal } from "../modal";
import { useState } from "react";

export const ReportCard = ({ to, icon, text, name }) => (
    <CCol md={4} className="mb-3">
        <NavLink style={{ textDecoration: "none" }} to={`${to}/${name}`}>
            <CCard className="shadow-sm">
                <CCardBody className="d-flex align-items-center">
                    <CIcon icon={icon} size="xl" className="me-3 text-primary" />
                    <CCardText className="text-small">{text}</CCardText>
                </CCardBody>
            </CCard>
        </NavLink>
    </CCol>
);

export const CommissionTable = ({ title, progressColor, tableExample }) => (
    <CTable align="middle" className="mb-0 border shadow-sm table-manager">
        <CTableHead>
            <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary">{title}</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Комиссия в %</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {tableExample.map((item, index) => (
                <CTableRow key={index}>
                    <CTableDataCell>{item.user.name}</CTableDataCell>
                    <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                            <div className="fw-semibold">{item.usage.value}%</div>
                        </div>
                        <CProgress thin color={progressColor} value={item.usage.value} />
                    </CTableDataCell>
                </CTableRow>
            ))}
        </CTableBody>
    </CTable>
);

export const StatCard = ({ color, title, subtitle }) => (
    <CCol md={3}>
        <CCard
            className="text-white mb-3"
            style={{
                background: `linear-gradient(135deg, ${color})`,
                borderRadius: "12px",
            }}
        >
            <CCardBody>
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <h3 className="fw-bold text-large">{title}</h3>
                        <small className="d-block text-opacity-small">{subtitle}</small>
                    </div>
                </div>
            </CCardBody>
        </CCard>
    </CCol>
);

export const ManagerTable = ({ managers, status, error }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = (row) => {
        setModalData(row);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <CTable bordered className="text-center align-middle table-manager shadow-sm">
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary">Имя</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Кол-во байеров</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Оборот</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Кол-во заказов</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Коэфф.</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Ваша комиссия 20%</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Детали</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {status === 'loading' && (
                        <CTableRow>
                            <CTableDataCell colSpan={7}>Загрузка данных...</CTableDataCell>
                        </CTableRow>
                    )}
                    {status === 'failed' && (
                        <CTableRow>
                            <CTableDataCell colSpan={7}>Ошибка загрузки: {error}</CTableDataCell>
                        </CTableRow>
                    )}
                    {(!managers || managers.length === 0) && status !== 'loading' && status !== 'failed' && (
                        <CTableRow>
                            <CTableDataCell colSpan={7}>Нет данных для отображения</CTableDataCell>
                        </CTableRow>
                    )}
                    {managers && managers.length > 0 &&
                        managers
                            .slice()
                            .filter(a => a.curator && !a.curator.includes('ВМ'))
                            .sort((a, b) => b.allCoeff - a.allCoeff)
                            .map((row, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{row.curator}</CTableDataCell>
                                    <CTableDataCell>{row.buyerLength}</CTableDataCell>
                                    <CTableDataCell>{row.totalcom} сом</CTableDataCell>
                                    <CTableDataCell>{row.order}</CTableDataCell>
                                    <CTableDataCell>{row.allCoeff}</CTableDataCell>
                                    <CTableDataCell>{row.comission} сом</CTableDataCell>
                                    <CTableDataCell>
                                        <button onClick={() => handleOpenModal(row.detail)} style={{ textDecoration: "underline", color: "blue", border: "none", background: "none" }}>
                                            Подробнее
                                        </button>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                </CTableBody>
            </CTable>
            {isModalOpen &&
                <UniversalModal isOpen={isModalOpen} onClose={handleCloseModal} title="Детали" onConfirm={handleConfirm}>
                    <CTable bordered hover className="table-manager">
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell className="bg-body-tertiary">Имя</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">Кол-во заказов</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">Сумма</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {modalData
                                .slice()
                                .sort((a, b) => b.summa - a.summa)
                                .map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{item.name}</CTableDataCell>
                                        <CTableDataCell>{item.orders}</CTableDataCell>
                                        <CTableDataCell>{item.summa} сом</CTableDataCell>
                                    </CTableRow>
                                ))}
                        </CTableBody>
                    </CTable>
                </UniversalModal>
            }
        </div>
    );
};

export const AdminTable = ({ admins, status, error }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = (row) => {
        setModalData(row);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <CTable bordered className="text-center align-middle table-manager shadow-sm mt-5">
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary">Имя</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Кол-во логистов</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Оборот</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Кол-во заказов</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Коэфф.</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Детали</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {status === 'loading' && (
                        <CTableRow>
                            <CTableDataCell colSpan={7}>Загрузка данных...</CTableDataCell>
                        </CTableRow>
                    )}
                    {status === 'failed' && (
                        <CTableRow>
                            <CTableDataCell colSpan={7}>Ошибка загрузки: {error}</CTableDataCell>
                        </CTableRow>
                    )}
                    {(!admins || admins.length === 0) && status !== 'loading' && status !== 'failed' && (
                        <CTableRow>
                            <CTableDataCell colSpan={7}>Нет данных для отображения</CTableDataCell>
                        </CTableRow>
                    )}
                    {admins && admins.length > 0 && admins
                        .slice()
                        .sort((a, b) => b.coeff - a.coeff)
                        .map((row, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{row.curator}</CTableDataCell>
                                <CTableDataCell>{row.logistLength}</CTableDataCell>
                                <CTableDataCell>{row.totalcom} сом</CTableDataCell>
                                <CTableDataCell>{row.order}</CTableDataCell>
                                <CTableDataCell>{row.coeff}</CTableDataCell>
                                <CTableDataCell>
                                    <button onClick={() => handleOpenModal(row.detail)} style={{ textDecoration: "underline", color: "blue", border: "none", background: "none" }}>
                                        Подробнее
                                    </button>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                </CTableBody>
            </CTable>
            {isModalOpen &&
                <UniversalModal isOpen={isModalOpen} onClose={handleCloseModal} title="Детали" onConfirm={handleConfirm}>
                    <CTable bordered hover className="table-manager">
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell className="bg-body-tertiary">Имя</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">Кол-во заказов</CTableHeaderCell>
                                <CTableHeaderCell className="bg-body-tertiary">Сумма</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {modalData
                                .slice()
                                .sort((a, b) => b.summa - a.summa)
                                .map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{item.name}</CTableDataCell>
                                        <CTableDataCell>{item.orders}</CTableDataCell>
                                        <CTableDataCell>{item.summa} сом</CTableDataCell>
                                    </CTableRow>
                                ))}
                        </CTableBody>
                    </CTable>
                </UniversalModal>
            }
        </div>
    );
};