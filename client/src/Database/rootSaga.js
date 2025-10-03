import { fork, all } from 'redux-saga/effects';
import DashboardSaga from './Saga/DashboardSaga';
import ConstantSaga from './Saga/ConstantSaga';

function* rootSaga() {
    yield all([
        fork(DashboardSaga),
        fork(ConstantSaga),
    ]);
}

export default rootSaga