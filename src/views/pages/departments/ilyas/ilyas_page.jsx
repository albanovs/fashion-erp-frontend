import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepartementPageComponent from "../components/pages/global_page";
import { fetchManagers } from "src/app/slices/raiting";
import { fetchAdminsIilyas } from "src/app/slices/departments/ilyas/admin_raiting";
import { fetchItogs } from "src/app/slices/itogs";

const IlyasPage = () => {
    const dispatch = useDispatch();
    const { managers, status, error } = useSelector((state) => state.raiting);
    const { ilyas_admins, ilyas_status, ilyas_error } = useSelector((state) => state.adminraitingilyas);
    const { itogs, itog_status } = useSelector((state) => state.itogs);

    useEffect(() => {
        dispatch(fetchManagers());
        dispatch(fetchAdminsIilyas());
        dispatch(fetchItogs());
    }, [dispatch]);

    const currentDate = new Date().toISOString().slice(0, 7);
    const filteredData = managers.filter((manager) => manager.datas === currentDate);
    const filteredManagers = filteredData.flatMap((manager) => manager.managers.filter((manager) => manager.otdel === "Ильяс"));
    const buyers = filteredManagers?.reduce((acc, manager) => acc + (manager.buyerLength || 0), 0);
    const logist = ilyas_admins?.reduce((acc, admin) => acc + (admin.logistLength || 0), 0);

    return (
        <div>
            <DepartementPageComponent
                name="ilyas"
                managers={filteredManagers}
                status={status}
                error={error}
                admins={ilyas_admins}
                admin_status={ilyas_status}
                admin_error={ilyas_error}
                byers_length={buyers}
                logist_length={logist}
                itogs={itogs.totalAllItog?.fenix?.itog}
                index={itogs.totalAllItog?.fenix?.index}
            />
        </div>
    );
};

export default IlyasPage;
