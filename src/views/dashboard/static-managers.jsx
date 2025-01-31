import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagers } from "src/app/slices/raiting";

function StaticManagers() {

    const { managers, status_manager, error_manager } = useSelector(state => state.raiting);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status_manager === 'idle') {
            dispatch(fetchManagers());
        }
    }, [dispatch, status_manager]);

    const currentDate = new Date().toISOString().slice(0, 7);

    let data = managers
        .filter(item => item.datas === currentDate)
        .flatMap(item => item.managers)
        .sort((a, b) => {
            const coeffA = parseFloat(a.allCoeff) || 0;
            const coeffB = parseFloat(b.allCoeff) || 0;
            return coeffB - coeffA;
        });

    const filteredData = data.filter(item =>
        item.curator && !item.curator.includes('ВМ')
    );

    return (
        <CCard className="mb-4">
            <CCardHeader>Рейтинг старших менеджеров</CCardHeader>
            <p className="mb-2 ml-4 mt-2">за текущий месяц</p>
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
                        {status_manager === 'loading' ? <tr><td colSpan="5" className="text-center">Загрузка...</td></tr> : filteredData.map((item, index) => (
                            <tr key={item._id}>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border lg:p-3 p-2 w-full">{item.curator}</td>
                                <td className="border p-2 text-center">{item.buyerLength}</td>
                                <td className="border p-2 text-center">{item.allCoeff}</td>
                                <td className="border p-2 text-center text-[6px]">{item.data_register}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CCardBody>
        </CCard>
    );
}

export default StaticManagers;
