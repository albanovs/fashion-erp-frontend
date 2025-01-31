import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepartementPageComponent from "../components/pages/global_page";
import { fetchManagers } from "src/app/slices/raiting";
import { fetchAdminsTuran } from "src/app/slices/departments/turan/admin_raiting";
import { fetchItogs } from "src/app/slices/itogs";

const TuranPage = () => {
    const dispatch = useDispatch();
    const { managers, status, error } = useSelector((state) => state.raiting);
    const { turan_admins, admin_status, admin_error } = useSelector((state) => state.adminraitingturan);
    const { itogs, itog_status } = useSelector((state) => state.itogs);

    useEffect(() => {
        dispatch(fetchManagers());
        dispatch(fetchItogs());
        dispatch(fetchAdminsTuran());
    }, [dispatch]);

    const currentDate = new Date().toISOString().slice(0, 7);
    const filteredData = managers.filter((manager) => manager.datas === currentDate);
    const filteredManagers = filteredData.flatMap((manager) => manager.managers.filter((manager) => manager.otdel === "Туран"));
    const buyers = filteredManagers.reduce((acc, manager) => acc + (manager.buyerLength || 0), 0);
    const logist = turan_admins.reduce((acc, admin) => acc + (admin.logistLength || 0), 0);

    return (
        <div>
            <DepartementPageComponent
                name="turan"
                managers={filteredManagers}
                status={status}
                error={error}
                admins={turan_admins}
                admin_status={admin_status}
                admin_error={admin_error}
                byers_length={buyers}
                logist_length={logist}
                itogs={itogs.totalAllItog?.turan?.itog}
                index={itogs.totalAllItog?.turan?.index}
            />
        </div>
    );
};

export default TuranPage;
