import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepartementPageComponent from "../components/pages/global_page";
import { fetchManagers } from "src/app/slices/raiting";
import { fetchAdmins } from "src/app/slices/departments/monaco/admin_raiting";
import { fetchItogs } from "src/app/slices/itogs";

const MonacoPage = () => {
    const dispatch = useDispatch();
    const { managers, status, error } = useSelector((state) => state.raiting);
    const { admins, admin_status, admin_error } = useSelector((state) => state.adminraiting);
    const { itogs, itog_status } = useSelector((state) => state.itogs);

    useEffect(() => {
        dispatch(fetchManagers());
        dispatch(fetchAdmins());
        dispatch(fetchItogs());
    }, [dispatch]);

    const currentDate = new Date().toISOString().slice(0, 7);
    const filteredData = managers.filter((manager) => manager.datas === currentDate);
    const filteredManagers = filteredData.flatMap((manager) => manager.managers.filter((manager) => manager.otdel === "Кайрат"));
    const buyers = filteredManagers.reduce((acc, manager) => acc + (manager.buyerLength || 0), 0);
    const logist = admins.reduce((acc, admin) => acc + (admin.logistLength || 0), 0);

    return (
        <div>
            <DepartementPageComponent
                name="monaco"
                managers={filteredManagers}
                status={status}
                error={error}
                admins={admins}
                admin_status={admin_status}
                admin_error={admin_error}
                byers_length={buyers}
                logist_length={logist}
                itogs={itogs.totalAllItog?.lider?.itog}
                index={itogs.totalAllItog?.lider?.index}
            />
        </div>
    );
};

export default MonacoPage;
