import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagers } from "src/app/slices/raiting";

function StaticManagersLastMonth() {

    const { managers, status_manager, error_manager } = useSelector(state => state.raiting);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status_manager === 'idle') {
            dispatch(fetchManagers());
        }
    }, [dispatch, status_manager]);

    const currentDate = new Date();
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const previousMonthFormatted = `${previousMonth.getFullYear()}-${previousMonth.getMonth() + 1}`;
    const lastMonthData = managers ? managers.find(item => item.datas === previousMonthFormatted) : null;
    return (
        <CCard className="mb-4">
            <CCardHeader>Рейтинг старших менеджеров</CCardHeader>
            <p className="mb-2 ml-4 mt-2">за предыдущий месяц</p>
            <p className="lg:text-[11px] text-[9px] mb-2 ml-4">формула: коефф = (касса / кол-во байер) + (кол-во заказов / кол-во байер)</p>
            <CCardBody className="overflow-x-auto">
                <table className="w-full lg:text-[12px] text-[9px]">
                    <thead>
                        <tr className="bg-[#ccc]/30 dark:bg-black/20">
                            <th className="border p-2">топ</th>
                            <th className="border p-2">имя</th>
                            <th className="border p-2">кол-во байеров</th>
                            <th className="border p-2">коефф</th>
                            <th className="border p-2">д/р</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lastMonthData && [...lastMonthData.managers]
                            .sort((a, b) => parseFloat(b.allCoeff) - parseFloat(a.allCoeff))
                            .filter(cur => !cur.curator.includes("ВМ"))
                            .map((manager, index) => {
                                const fixedcoeff = parseFloat(manager.allCoeff).toFixed(2);
                                return (
                                    <tr key={index}>
                                        <td className='border p-2'>{index + 1}</td>
                                        <td className="border lg:p-3 p-2 w-full">{manager.curator}</td>
                                        <td className="border p-2 text-center">{manager.buyerLength}</td>
                                        <td className="border p-2 text-center">{fixedcoeff}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </CCardBody>
        </CCard>
    );
}

export default StaticManagersLastMonth;
