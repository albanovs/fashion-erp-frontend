import React from 'react';
import { CCard, CCardBody, CRow, CCol, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cibInstagram, cibTelegram } from '@coreui/icons';
import { NavLink } from 'react-router-dom';

const SlotPage = () => {
    const cards = [
        {
            id: 1,
            gradient: 'linear-gradient(45deg, #f9a962, #f58a5b, #ed5e6e, #d94389, #b83499)',
            icon: cibInstagram,
            title: 'Инстаграм слоты',
            link: '/instagram-edit',
        },
        {
            id: 2,
            gradient: 'linear-gradient(45deg, #4ebfe2, #3aa9cf, #2e94bd, #267daa)',
            icon: cibTelegram,
            title: 'Телеграм слоты',
            link: '/telegram-edit',
        },
    ];

    return (
        <CRow className="g-4">
            {cards.map((card) => (
                <CCol xs={12} sm={6} key={card.id}>
                    <CCard style={{ background: card.gradient, color: '#fff', border: 'none' }}>
                        <CCardBody>
                            <div className="d-flex align-items-center mb-3">
                                <CIcon icon={card.icon} size="xl" className="me-3 text-white" />
                                <h4 className="mb-0">{card.title}</h4>
                            </div>
                            <div className="text-end">
                                <NavLink to={card.link}>
                                    <CButton color="light" style={{ fontWeight: 'bold' }}>Перейти</CButton>
                                </NavLink>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            ))}
        </CRow>
    );
};

export default SlotPage;