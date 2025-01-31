import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibArtstation,
  cibDropbox,
  cibHubspot,
  cibInstagram,
  cibTableau,
  cibTelegramPlane,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSim,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Статистика',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Слоты',
  },
  {
    component: CNavItem,
    name: 'Инстаграм слоты',
    to: '/slots/instagram',
    icon: <CIcon icon={cibInstagram} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Телеграм слоты',
    to: '/slots/telegram',
    icon: <CIcon icon={cibTelegramPlane} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Другие',
  },
  {
    component: CNavItem,
    name: 'Отделы',
    to: '/departments',
    icon: <CIcon icon={cibArtstation} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Фулфилмент',
    to: '/fulfillment',
    icon: <CIcon icon={cibDropbox} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Редактор',
  },
  {
    component: CNavItem,
    name: 'Слоты',
    to: '/edit/slots',
    icon: <CIcon icon={cibTableau} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Аккаунты',
    to: '/edit/accounts',
    icon: <CIcon icon={cibHubspot} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'SIM карты',
    to: '/edit/sim-cards',
    icon: <CIcon icon={cilSim} customClassName="nav-icon" />,
  },
]

export default _nav
