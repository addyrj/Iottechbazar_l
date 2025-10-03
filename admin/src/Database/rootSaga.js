import { fork, all } from 'redux-saga/effects';
import AdminSaga from './Saga/AdminSaga';
import UserDashboardSaga from './Saga/UserDashboardSaga';

function* rootSaga() {
    yield all([
        fork(AdminSaga),
        fork(UserDashboardSaga),
    ]);
}

export default rootSaga