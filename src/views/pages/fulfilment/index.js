import React from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react';
import { cilListRich, cilPenAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { NavLink } from 'react-router-dom';
const FulfilmentPage = () => {

    const departments = [
        { id: 1, name: 'Создать отчет', link: '/fulfilment/create', icon: cilPenAlt },
        { id: 2, name: 'Отчеты', link: '/fulfilment/reports', icon: cilListRich },
    ]
    return (
        <div className="container mt-5 mb-5">
            <CRow className="g-4">
                {
                    departments.map((department) => (
                        <CCol xs={12} sm={6} md={4} xl={3} key={department.id}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <CIcon icon={department.icon} size="xl" />
                                </CCardHeader>
                                <CCardBody>
                                    <h5>{department.name}</h5>
                                    <div className="d-flex justify-content-end">
                                        <NavLink to={department.link}>
                                            <CButton size="sm" color="primary">Перейти</CButton>
                                        </NavLink>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))
                }
            </CRow>
        </div>
    )
};

export default FulfilmentPage;