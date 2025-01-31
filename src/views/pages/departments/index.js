import React from 'react'
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react';
import { cibAdguard, cibBuffer } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { NavLink } from 'react-router-dom';
const Departments = () => {

    const departments = [
        { id: 1, name: 'Монако', link: '/departments/monaco', icon: cibBuffer },
        { id: 2, name: 'Туран', link: '/departments/turan', icon: cibBuffer },
        { id: 3, name: 'Ильяс', link: '/departments/ilyas', icon: cibBuffer },
        { id: 4, name: 'IT отдел', link: '/departments/it', icon: cibAdguard },
    ]

    return (
        <div>
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
        </div>
    )
}
export default Departments