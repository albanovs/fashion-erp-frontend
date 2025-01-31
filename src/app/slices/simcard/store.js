import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/theme';
import raitingSlice from './slices/raiting';
import itogSlice from './slices/itogs';

// monaco 
import admin_raitingSlice from './slices/departments/monaco/admin_raiting';
import monaco_reports from './slices/departments/monaco/reports';
import ClientSliceMonaco from './slices/departments/monaco/clients';
// turan
import admin_raitingSliceturan from './slices/departments/turan/admin_raiting';
import turan_reports from './slices/departments/turan/reports';
import ClientSliceTuran from './slices/departments/turan/clients';
// ilyas
import admin_raitingSliceilyas from './slices/departments/ilyas/admin_raiting';
import ilyas_reports from './slices/departments/ilyas/reports';
import ClientSliceilyas from './slices/departments/ilyas/clients';
// simcard
import reportSliceSimLog from './slices/simcard/ilyas';
import reportSliceSimLogTuran from './slices/simcard/turan';
import reportSliceSimLogMonaco from './slices/simcard/monaco';
import reportSliceSimManagerMonaco from './slices/simcard/monaco_manager';
import reportSliceSimManagerTuran from './slices/simcard/turan_manager';
import reportSliceSimManagerIlyas from './slices/simcard/ilyas_manager';
import reportSliceSimManagers from './slices/simcard/managers';

const store = configureStore({
  reducer: {
    ui: uiSlice,
    raiting: raitingSlice,
    itogs: itogSlice,
    adminraiting: admin_raitingSlice,
    monaco_reports: monaco_reports,
    adminraitingturan: admin_raitingSliceturan,
    turan_reports: turan_reports,
    adminraitingilyas: admin_raitingSliceilyas,
    ilyas_reports: ilyas_reports,
    monaco_client: ClientSliceMonaco,
    turan_client: ClientSliceTuran,
    ilyas_client: ClientSliceilyas,
    logistturan: reportSliceSimLogTuran,
    logistilyas: reportSliceSimLog,
    logistmonaco: reportSliceSimLogMonaco,
    managermonaco: reportSliceSimManagerMonaco,
    managerturan: reportSliceSimManagerTuran,
    managerilyas: reportSliceSimManagerIlyas,
    managerssimcard: reportSliceSimManagers
  },
});

export default store;