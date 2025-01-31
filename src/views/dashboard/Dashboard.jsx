import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { CCard, CCardHeader } from '@coreui/react'
import BarChart from './barchart'
import { fetchItoglast, fetchItogs } from 'src/app/slices/itogs'
import { fetchBuyerRaiting, fetchManagers } from 'src/app/slices/raiting'
import StaticManagers from './static-managers'
import StaticManagersLastMonth from './static-managers-last-month'
import StaticLogist from './static-logist'
import StaticAdmin from './static-admin'

const Dashboard = () => {

  const dispatch = useDispatch()
  const { itogs, itoglast, status, error, status_itoglast, error_itoglast } = useSelector(state => state.itogs)
  const { managers, buyerRaiting, status_manager, error_manager, status_buyer, error_buyer } = useSelector((state) => state.raiting)
  const dataItog = []
  const dataIndex = []
  const dataItoglast = []
  const dataIndexlast = []


  if (status === 'succeeded') {
    dataItog.push(itogs.totalAllItog?.lider.percentItog)
    dataItog.push(itogs.totalAllItog?.fenix.percentItog)
    dataItog.push(itogs.totalAllItog?.turan.percentItog)

    dataIndex.push(itogs.totalAllItog?.lider.percentIndex)
    dataIndex.push(itogs.totalAllItog?.fenix.percentIndex)
    dataIndex.push(itogs.totalAllItog?.turan.percentIndex)
  }
  if (status_itoglast === 'succeeded') {
    dataItoglast.push(itoglast.totalAllItog?.lider.percentItog)
    dataItoglast.push(itoglast.totalAllItog?.fenix.percentItog)
    dataItoglast.push(itoglast.totalAllItog?.turan.percentItog)

    dataIndexlast.push(itoglast.totalAllItog?.lider.percentIndex)
    dataIndexlast.push(itoglast.totalAllItog?.fenix.percentIndex)
    dataIndexlast.push(itoglast.totalAllItog?.turan.percentIndex)
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItogs())
    }
  }, [dispatch, status])

  useEffect(() => {
    if (status_itoglast === 'idle') {
      dispatch(fetchItoglast())
    }
  }, [dispatch, status_itoglast])

  useEffect(() => {
    if (status_buyer === 'idle') {
      dispatch(fetchBuyerRaiting())
    }
  }, [dispatch, status_buyer])

  return (
    status === 'succeeded' && status_itoglast === 'succeeded' ? (
      <div>
        < div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
          <BarChart subtitle="за текущий месяц" datas={dataItog} datasindex={dataIndex} title='комиссия' titleindex='индекс' color="rgba(255, 99, 132, 1)" colorindex="rgba(212, 71, 4, 0.1)" />
          <BarChart subtitle="за неделю" datas={dataItoglast} datasindex={dataIndexlast} title='комиссия' titleindex='индекс' color="rgba(255, 99, 132, 1)" colorindex="rgba(212, 71, 4, 0.1)" />
        </div>
        <div className='mt-10 mb-10'>
          <CCard>
            <CCardHeader>Топ 15 байеров</CCardHeader>
            <table className='w-full'>
              <thead className="">
                <tr className="">
                  <th className="border p-1 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">топ</th>
                  <th className="border p-1 lg:w-80 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                  <th className="border p-1 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">отдел</th>
                  <th className="border p-1 lg:w-10 lg:px-3 lg:py-3 text-left lg:text-[10px] text-[6px] font-medium text-gray-500 uppercase tracking-wider">коефф</th>
                  <th className="border p-1 lg:w-60 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">Куратор</th>
                  <th className="border p-1 lg:px-6 lg:py-3 text-left lg:text-xs text-[6px] font-medium text-gray-500 uppercase tracking-wider">дата регистрации</th>
                </tr>
              </thead>
              <tbody>
                {
                  buyerRaiting?.map((item, index) => (
                    index <= 14 && <tr key={index}>
                      <td className="border lg:px-6 lg:py-3 p-2 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{index + 1}</td>
                      <td className="border lg:px-6 lg:py-3 p-2 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.name}</td>
                      <td className="border lg:px-6 lg:py-3 p-2 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.team}</td>
                      <td className="border lg:px-6 lg:py-3 p-2 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.coeff}</td>
                      <td className="border lg:px-6 lg:py-3 p-2 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.curator}</td>
                      <td className="border lg:px-6 lg:py-3 p-2 text-left lg:text-xs text-[6px] font-medium text-gray-500 tracking-wider">{item.data_register}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </CCard>
        </div >
        <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
          <StaticManagers />
          <StaticManagersLastMonth />
          <StaticLogist />
          <StaticAdmin />
        </div>
      </div >
    ) : (
      <div className='w-full gap-2 flex-col flex justify-center items-center'><svg aria-hidden="true" class="w-6 h-6  text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>загружаем данных, просим подождать</div>
    )
  )
}

export default Dashboard