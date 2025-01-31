import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { CButton } from '@coreui/react'
import { AiFillContacts } from "react-icons/ai";

const AppHeaderDropdown = () => {

  const logout = () => {
    localStorage.removeItem('roles')
    window.location.href = '/'
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CButton color="primary" variant="outline" onClick={logout}>Выход</CButton>
      </CDropdownToggle>
    </CDropdown>
  )
}

export default AppHeaderDropdown
