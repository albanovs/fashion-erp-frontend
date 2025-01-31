import React from "react";
import { CRow } from "@coreui/react";
import {
    cilClipboard,
    cilDescription,
    cilColorBorder,
    cilUserFollow,
    cilMoney,
    cibElementary,
} from "@coreui/icons";

import { AdminTable, ManagerTable, ReportCard, StatCard } from "./utils";

const cardData = [
    { to: "/create-report", icon: cilColorBorder, text: "Создать отчет" },
    { to: "/reports", icon: cilDescription, text: "Ежедневные отчеты" },
    { to: "/reports-manager", icon: cilClipboard, text: "Отчеты для менеджеров" },
    { to: "/clients", icon: cilUserFollow, text: "Привлеченные клиенты" },
    { to: "/invoices", icon: cilMoney, text: "Счет фактура" },
    { to: "/simcard", icon: cibElementary, text: "SIM карты СМ" },
];

const DepartementPageComponent = ({ name, managers, status, error, admins, admin_status, admin_error, byers_length, logist_length, itogs, index }) => (
    <div>
        <CRow>
            {cardData.map((card, idx) => (
                <ReportCard key={idx} {...card} name={name} />
            ))}
        </CRow>
        <CRow>
            {[
                { color: "#8A86C9, #A5A3D6", title: byers_length, subtitle: "Количество байеров" },
                { color: "#B16A63, #C98983", title: logist_length, subtitle: "Количество логистов" },
                { color: "#C4A767, #D6C48C", title: itogs, subtitle: "Комиссия" },
                { color: "#5F97B5, #85B5CF", title: index, subtitle: "Индекс" },
            ].map((stat, idx) => (
                <StatCard key={idx} {...stat} />
            ))}
        </CRow>
        <div>
            <ManagerTable managers={managers} status={status} error={error} />
            <AdminTable admins={admins} status={admin_status} error={admin_error} />
        </div>
    </div>
);

export default DepartementPageComponent;