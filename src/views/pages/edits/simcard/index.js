import React from 'react';
import { CCard, CCardBody, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBuilding, cilSim } from '@coreui/icons';
import { NavLink } from 'react-router-dom';

const sections = [
    {
        title: 'SIM карты байеров и старших менеджеров',
        cards: [
            { name: 'Монако', links: '/simcard/monako-managers', bg: 'warning' },
            { name: 'Туран', links: '/simcard/turan-managers', bg: 'warning' },
            { name: 'Ильяс', links: '/simcard/ilyas-managers', bg: 'warning' },
            { name: 'Старшие менеджеры', links: '/simcard/managers', bg: 'warning' },
            { name: 'IT отдел', links: '/simcard', bg: 'success' },
        ],
    },
    {
        title: 'SIM карты старших админов и логистов',
        cards: [
            { name: 'Монако', links: '/simcard/monako-admins', bg: 'info' },
            { name: 'Туран', links: '/simcard/turan-admins', bg: 'info' },
            { name: 'Ильяс', links: '/simcard/ilyas-admins', bg: 'info' },
        ],
    },
];

const SimCardPage = () => {
    return (
        <div className="p-4">
            {sections.map((section, index) => (
                <div key={index} className="mb-4">
                    <h5 className="mb-3">{section.title}</h5>
                    <CRow className="g-3">
                        {section.cards.map((card, idx) => (
                            <CCol xs={12} sm={6} lg={4} key={idx}>
                                <NavLink to={card.links} style={{ textDecoration: 'none' }}>
                                    <CCard className="h-100 border-1 shadow-sm" style={{ cursor: 'pointer' }}>
                                        <CCardBody>
                                            <div className="d-flex align-items-center mb-3">
                                                <div
                                                    className={`rounded-circle bg-${card.bg} p-3 d-flex align-items-center justify-content-center`}
                                                    style={{ width: '50px', height: '50px' }}
                                                >
                                                    <CIcon icon={cilSim} />
                                                </div>
                                                <h6 className="ms-3 mb-0">{card.name}</h6>
                                            </div>
                                        </CCardBody>
                                    </CCard>
                                </NavLink>
                            </CCol>
                        ))}
                    </CRow>
                </div>
            ))}
        </div>
    );
};

export default SimCardPage;
