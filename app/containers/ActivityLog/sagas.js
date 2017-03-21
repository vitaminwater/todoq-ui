import { fromJS } from 'immutable';
import { request, } from 'utils/request';
import { take, takeLatest, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  LOADING_MORE_LOGS,
  LOAD_MORE_LOGS,
  NO_MORE_LOGS,
} from './constants';

import { loadingMoreLogs, loadedMoreLogs } from './actions';

const selectCurrentPage = state => state.get('currentPage');

function* loadMoreLogs(action) {
  const url = `http://localhost:4000/activities/${action.activityId}/logs`;
  try {
    yield put(loadingMoreLogs(action.activityId));
    const logs = yield call(request, url);
    if (logs) {
      yield put(loadedMoreLogs(fromJS(logs.data)));
    } else {
      yield put(noMoreLogs(fromJS(logs.data)));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* logSaga() {
  const loadMoreLogsWatcher = yield takeLatest(LOAD_MORE_LOGS, loadMoreLogs);

  yield take(LOCATION_CHANGE);
  yield cancel(loadMoreLogsWatcher);
}

export default [
  logSaga,
];
