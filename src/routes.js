import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const InstagramSlot = React.lazy(() => import('./views/pages/slots/instagram'))
const TelegramSlot = React.lazy(() => import('./views/pages/slots/telegram'))

// Фулфимент

const FulfilmentPage = React.lazy(() => import('./views/pages/fulfilment/index'))

// Отделы

const Departments = React.lazy(() => import('./views/pages/departments/index'))

// Монако
const MonacoPage = React.lazy(() => import('./views/pages/departments/monaco/monaco_page'))
const CreateReportMonaco = React.lazy(() => import('./views/pages/departments/monaco/create_report'))
const ListOtchetMonaco = React.lazy(() => import('./views/pages/departments/monaco/reports/listOtchet'))
const DetailListMonaco = React.lazy(() => import('./views/pages/departments/monaco/reports/detailList'))
const SearchOtchetMonaco = React.lazy(() => import('./views/pages/departments/monaco/reports/searchOtchet'))
const ListManagerMonaco = React.lazy(() => import('./views/pages/departments/monaco/reports/listMahager'))
const ReporMonacoDetailtPage = React.lazy(() => import('./views/pages/departments/monaco/reports/detailListManager'))
const ClientsMonaco = React.lazy(() => import('./views/pages/departments/monaco/clients'))
const SimCardadminMonaco = React.lazy(() => import('./views/pages/edits/simcard/logistmonaco'))
const SimCardmanagerMonaco = React.lazy(() => import('./views/pages/edits/simcard/manager_monaco'))

// Туран
const TuranPage = React.lazy(() => import('./views/pages/departments/turan/turan_page'))
const ReporTuranDetailtPage = React.lazy(() => import('./views/pages/departments/turan/reports/detailListManager'))
const CreateReportTuran = React.lazy(() => import('./views/pages/departments/turan/create_report'))
const ListOtchetTuran = React.lazy(() => import('./views/pages/departments/turan/reports/listOtchet'))
const SearchOtchetTuran = React.lazy(() => import('./views/pages/departments/turan/reports/searchOtchet'))
const DetailListTuran = React.lazy(() => import('./views/pages/departments/turan/reports/detailList'))
const ListManagerTuran = React.lazy(() => import('./views/pages/departments/turan/reports/listMahager'))
const ClientsTuran = React.lazy(() => import('./views/pages/departments/turan/clients'))
const SimCardadminTuran = React.lazy(() => import('./views/pages/edits/simcard/logistturan'))
const SimCardmanagerTuran = React.lazy(() => import('./views/pages/edits/simcard/manager_turan'))

// Ильяс
const IlyasPage = React.lazy(() => import('./views/pages/departments/ilyas/ilyas_page'))
const ReporIlyasDetailtPage = React.lazy(() => import('./views/pages/departments/ilyas/reports/detailListManager'))
const CreateReportIlyas = React.lazy(() => import('./views/pages/departments/ilyas/create_report'))
const ListOtchetIlyas = React.lazy(() => import('./views/pages/departments/ilyas/reports/listOtchet'))
const SearchOtchetIlyas = React.lazy(() => import('./views/pages/departments/ilyas/reports/searchOtchet'))
const DetailListIlyas = React.lazy(() => import('./views/pages/departments/ilyas/reports/detailList'))
const ListManagerIlyas = React.lazy(() => import('./views/pages/departments/ilyas/reports/listMahager'))
const ClientsIlyas = React.lazy(() => import('./views/pages/departments/ilyas/clients'))
const SimCardadminIlyas = React.lazy(() => import('./views/pages/edits/simcard/logistilyas'))
const SimCardmanagerIlyas = React.lazy(() => import('./views/pages/edits/simcard/manager_ilyas'))

// IT отдел
const ITPage = React.lazy(() => import('./views/pages/departments/it/global-page'))
const ITreportsDetail = React.lazy(() => import('./views/pages/departments/it/components/detail-itog'))
const ITbuyerPage = React.lazy(() => import('./views/pages/departments/it/pages/buyers/buyers'))
const PersonalPage = React.lazy(() => import('./views/pages/personal-page/personal-manager'))

// Редакторы

const Accounts = React.lazy(() => import('./views/pages/edits/account/index'))
const SimCardPage = React.lazy(() => import('./views/pages/edits/simcard/index'))
const SlotPage = React.lazy(() => import('./views/pages/edits/slots/index'))
const InstagramSlotEdit = React.lazy(() => import('./views/pages/edits/slots/instagram'))
const TelegramSlotEdit = React.lazy(() => import('./views/pages/edits/slots/editTG'))
const ManagerSim = React.lazy(() => import('./views/pages/edits/simcard/simcard_manager'))
const ItSim = React.lazy(() => import('./views/pages/edits/simcard/simcard_it'))
const SearchReportsIT = React.lazy(() => import('./views/pages/departments/it/pages/search-itogs/searchItog'))
const SeacrhClientIT = React.lazy(() => import('./views/pages/departments/it/pages/clients/search-clients'))
const SMmanagers = React.lazy(() => import('./views/pages/departments/it/pages/smanager/index'))
const Unauthorized = React.lazy(() => import('./components/un_auth'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Статистика', element: Dashboard },
  { path: '/slots/instagram', name: 'Инстаграм слоты', element: InstagramSlot },
  { path: '/slots/telegram', name: 'Телеграм слоты', element: TelegramSlot },
  { path: '/departments', name: 'Отделы', element: Departments },
  { path: '/unauthorized', name: 'Unauthorized', element: Unauthorized },

  { path: '/departments/monaco', name: 'Монако', element: MonacoPage, roles: ['adminfr', 'kairat', 'ВМ КРТ'] },
  { path: '/reports/monaco', name: 'Монако', element: ListOtchetMonaco, roles: ['adminfr', 'kairat', 'ВМ КРТ'] },
  { path: '/reports-manager/monaco', name: 'Монако', element: ListManagerMonaco, roles: ['adminfr', 'kairat', 'ВМ КРТ', 'СМ КРТ'] },
  { path: '/reports/monaco-manager/:id', name: 'Монако', element: ReporMonacoDetailtPage, roles: ['adminfr', 'kairat', 'ВМ КРТ', 'СМ КРТ',] },
  { path: '/create-report/monaco', name: 'Монако', element: CreateReportMonaco, roles: ['adminfr', 'kairat', 'ВМ КРТ', 'СМ КРТ'] },
  { path: '/monaco-list-search', name: 'Монако', element: SearchOtchetMonaco, roles: ['adminfr', 'kairat', 'ВМ КРТ'] },
  { path: '/reports/monaco/:id', name: 'Монако', element: DetailListMonaco, roles: ['adminfr', 'kairat', 'ВМ КРТ'] },
  { path: '/clients/monaco', name: 'Монако', element: ClientsMonaco, roles: ['adminfr', 'kairat', 'ВМ КРТ'] },
  { path: '/simcard/monako-admins', name: 'Монако', element: SimCardadminMonaco, roles: ['adminfr'] },
  { path: '/simcard/monako-managers', name: 'Монако', element: SimCardmanagerMonaco, roles: ['adminfr'] },

  { path: '/departments/turan', name: 'Туран', element: TuranPage, roles: ['adminfr', 'turan', 'ВМ ТРН'] },
  { path: '/reports/turan', name: 'Туран', element: ListOtchetTuran, roles: ['adminfr', 'turan', 'ВМ ТРН'] },
  { path: '/reports/turan-manager/:id', name: 'Туран', element: ReporTuranDetailtPage, roles: ['adminfr', 'turan', 'ВМ ТРН', 'СМ ТРН'] },
  { path: '/reports-manager/turan', name: 'Туран', element: ListManagerTuran, roles: ['adminfr', 'turan', 'ВМ ТРН', 'СМ ТРН'] },
  { path: '/create-report/turan', name: 'Туран', element: CreateReportTuran, roles: ['adminfr', 'turan', 'ВМ ТРН', 'СМ ТРН'] },
  { path: '/turan-list-search', name: 'Туран', element: SearchOtchetTuran, roles: ['adminfr', 'turan', 'ВМ ТРН'] },
  { path: '/reports/turan/:id', name: 'Туран', element: DetailListTuran, roles: ['adminfr', 'turan', 'ВМ ТРН'] },
  { path: '/clients/turan', name: 'Туран', element: ClientsTuran, roles: ['adminfr', 'turan', 'ВМ ТРН'] },
  { path: '/simcard/turan-admins', name: 'Туран', element: SimCardadminTuran, roles: ['adminfr', 'turan', 'ВМ ТРН'] },
  { path: '/simcard/turan-managers', name: 'Туран', element: SimCardmanagerTuran, roles: ['adminfr', 'turan', 'ВМ ТРН'] },

  { path: '/departments/ilyas', name: 'Ильяс', element: IlyasPage, roles: ['adminfr', 'ilyas', 'ВМ ОЛМ'] },
  { path: '/reports/ilyas', name: 'Ильяс', element: ListOtchetIlyas, roles: ['adminfr', 'ilyas', 'ВМ ОЛМ'] },
  { path: '/reports/fenix-manager/:id', name: 'Ильяс', element: ReporIlyasDetailtPage, roles: ['adminfr', 'ilyas', 'ВМ ОЛМ', 'СМ ОЛМ'] },
  { path: '/reports-manager/ilyas', name: 'Ильяс', element: ListManagerIlyas, roles: ['adminfr', 'ilyas', 'ВМ ОЛМ', 'СМ ОЛМ'] },
  { path: '/create-report/ilyas', name: 'Ильяс', element: CreateReportIlyas, roles: ['adminfr', 'ilyas', 'ВМ ОЛМ', 'СМ ОЛМ'] },
  { path: '/ilyas-list-search', name: 'Ильяс', element: SearchOtchetIlyas, roles: ['adminfr', 'ilyas', 'ВМ ОЛМ'] },
  { path: '/reports/ilyas/:id', name: 'Ильяс', element: DetailListIlyas, roles: ['adminfr', 'ilyas', 'ВМ ОЛМ'] },
  { path: '/clients/ilyas', name: 'Ильяс', element: ClientsIlyas, roles: ['adminfr', 'ilyas', 'ВМ ОЛМ'] },
  { path: '/simcard/ilyas-admins', name: 'Ильяс', element: SimCardadminIlyas, roles: ['adminfr', 'sim'] },
  { path: '/simcard/ilyas-managers', name: 'Ильяс', element: SimCardmanagerIlyas, roles: ['adminfr', 'sim'] },

  { path: '/search-itogs', name: "IT", element: SearchReportsIT, roles: ['adminfr', 'it'] },
  { path: '/it-smanager', name: "IT", element: SMmanagers, roles: ['adminfr', 'it'] },
  { path: '/departments/it', name: 'IT', element: ITPage, roles: ['adminfr', 'it'] },
  { path: '/detail-allitog/:id', name: 'IT', element: ITreportsDetail, roles: ['adminfr', 'it'] },
  { path: 'it-buyers', name: 'IT', element: ITbuyerPage, roles: ['adminfr', 'it'] },
  { path: '/search-client-otchet', name: 'IT', element: SeacrhClientIT, roles: ['adminfr', 'it'] },
  { path: '/personal-page', name: 'Личный кабинет', element: PersonalPage },

  { path: '/fulfillment', name: 'Фулфимент', element: FulfilmentPage, roles: ['adminfr'] },
  { path: '/edit/accounts', name: 'Редакторы аккаунтов', element: Accounts, roles: ['adminfr', 'it', 'sim'] },
  { path: '/edit/sim-cards', name: 'Редакторы SIM карт', element: SimCardPage, roles: ['adminfr', 'it', 'sim'] },
  { path: '/edit/slots', name: 'Редакторы слотов', element: SlotPage, roles: ['adminfr', , 'it', 'sim'] },
  { path: '/instagram-edit', name: 'Редакторы инстаграм слотов', element: InstagramSlotEdit, roles: ['adminfr', , 'it', 'sim'] },
  { path: '/telegram-edit', name: 'Редакторы телеграм слотов', element: TelegramSlotEdit, roles: ['adminfr', , 'it', 'sim'] },
  { path: '/simcard/managers', name: 'Мендежеры SIM', element: ManagerSim, roles: ['adminfr', , 'it', 'sim'] },
  { path: '/simcard', name: 'IT SIM', element: ItSim, roles: ['adminfr', , 'it', 'sim'] },
]

export default routes