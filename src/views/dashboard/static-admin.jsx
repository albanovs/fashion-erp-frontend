import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { CCard, CCardHeader } from "@coreui/react"
import { fetchAdmins } from "src/app/slices/departments/monaco/admin_raiting"
import { fetchAdminsTuran } from "src/app/slices/departments/turan/admin_raiting"
import { fetchAdminsIilyas } from "src/app/slices/departments/ilyas/admin_raiting"

function StaticAdmin() {

    const dispatch = useDispatch()
    const { admins, status, error } = useSelector(state => state.adminraiting)
    const { turan_admins, turan_status, turan_error } = useSelector(state => state.adminraitingturan)
    const { ilyas_admins, ilyas_status, ilyas_error } = useSelector(state => state.adminraitingilyas)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAdmins())
        }
    }, [dispatch, status])

    useEffect(() => {
        if (turan_status === 'idle') {
            dispatch(fetchAdminsTuran())
        }
    }, [dispatch, turan_status])

    useEffect(() => {
        if (ilyas_status === 'idle') {
            dispatch(fetchAdminsIilyas())
        }
    }, [dispatch, ilyas_status])

    const logist = [...admins, ...turan_admins, ...ilyas_admins]

    const filteredData = logist
        .filter(item => item.curator !== '')
        .flatMap(item => item.detail)
        .sort((a, b) => b.orders - a.orders);


    return (
        <CCard className="mb-4">
            <CCardHeader>Рейтинг админов</CCardHeader>
            <h1 className="text-sm ml-4 mt-2">за текущий месяц</h1>
            <div className="overflow-x-auto p-3">
                <table className="w-full lg:text-[12px] text-[9px]">
                    <thead>
                        <tr className="bg-[#ccc]/30 dark:bg-black/20">
                            <th className="border p-2">топ</th>
                            <th className="border p-2">имя</th>
                            <th className="border p-2">кол-во заказов</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((item, index) =>
                                <tr>
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border lg:p-3 p-2 w-full">{item.name}</td>
                                    <td className="border p-2 text-center">{item.orders}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </CCard>
    )
}

export default StaticAdmin