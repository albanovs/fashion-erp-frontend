import { CCard } from '@coreui/react';
import React, { useEffect } from 'react';
import { FaMoneyCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchManagers } from 'src/app/slices/raiting';

const getTeam = (role) => {
    if (role.includes('КРТ')) return 'monaco';
    if (role.includes('ТРН')) return 'turan';
    if (role.includes('ОЛМ')) return 'ilyas';
    return '';
};

const StatCard = ({ title, value, icon, description }) => (
    <CCard className="mb-2">
        <div className="p-2">
            <div className="stat-figure text-cyan-700">{icon}</div>
            <div className="stat-title text-[12px]">{title}</div>
            <div className="stat-value text-cyan-700 text-[25px]">
                {value} {typeof value === 'string' ? '%' : 'сом'}
            </div>
            <div className="stat-desc">{description}</div>
        </div>
    </CCard>
);

export default function PersonalManager() {
    const user = JSON.parse(localStorage.getItem('roles'))?.roles?.role || '';
    const team = getTeam(user);

    const dispatch = useDispatch();
    const { managers, status } = useSelector(state => state.raiting || []);
    const currentMonth = new Date().toISOString().slice(0, 7);

    const selectedData = managers
        .filter(el => el.datas?.slice(0, 7) === currentMonth)
        ?.flatMap(el =>
            Array.isArray(el.managers)
                ? el.managers.filter(manager => manager.curator === user)
                : []
        );

    useEffect(() => {
        dispatch(fetchManagers());
    }, [dispatch]);

    const statsData = selectedData?.[0] ? [
        { title: "Ваша комиссия 7%", value: Number(selectedData[0].comission || 0), icon: <FaMoneyCheck className="w-8 h-8" />, description: "за текущий месяц" },
        { title: "Доступные средства", value: Number(selectedData[0].for_withdrawal || 0), icon: <FaMoneyCheck className="w-8 h-8" />, description: "для вывода" },
        { title: "Ваш оборот в компании", value: Number(selectedData[0].totalcom || 0), icon: <FaMoneyCheck className="w-8 h-8" />, description: "за текущий месяц" },
    ] : [];

    const StatItem = ({ value, label }) => (
        <CCard className="stats">
            <div className="stat p-2">
                <div className="stat-title text-[12px]">{label}</div>
                <div className="stat-value text-cyan-700 text-[25px]">{value}</div>
            </div>
        </CCard>
    );

    return (
        <div>
            <CCard className="w-full h-screen p-3">
                <div className="flex flex-col gap-3 w-full">
                    <NavLink to={`/create-report/${team}`} style={{ textDecoration: 'none' }}>
                        <CCard className='p-2'>
                            <div className="stat-title text-cyan-700">Создать отчет</div>
                        </CCard>
                    </NavLink>
                    <NavLink to={`/reports-manager/${team}`} style={{ textDecoration: 'none' }}>
                        <CCard className="p-2">
                            <div className="stat-title text-cyan-700">Список отчетов</div>
                        </CCard>
                    </NavLink>
                </div>
                <div className="flex flex-col items-center justify-center gap-5 pt-5">
                    <div className="flex flex-col items-center gap-5">
                        <h1 className="font-semibold text-cyan-700">{selectedData?.[0]?.curator || 'Загрузка...'}</h1>
                    </div>
                    {selectedData.length > 0 ? (
                        <div className="w-full grid gap-3 lg:grid-cols-3">
                            <StatItem value={selectedData[0].buyerLength || 0} label="кол-во байер" />
                            <StatItem value={selectedData[0].order || 0} label="кол-во заказов" />
                            <StatItem value={selectedData[0].allCoeff || 0} label="коэффициент" />
                        </div>
                    ) : <p>Загрузка данных...</p>}
                    <div className="flex flex-col w-full">
                        {statsData.map((data, index) => <StatCard key={index} {...data} />)}
                    </div>
                </div>
            </CCard>
        </div>
    );
}