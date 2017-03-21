import { fromJS } from 'immutable';
import { request, jsonPOST } from 'utils/request';
import { take, takeLatest, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  LOAD_MORE_LOGS,
  CREATE_LOG,
} from './constants';

import {
  loadingMoreLogs,
  loadedMoreLogs,
  noMoreLogs,
  creatingLog,
  createdLog,
} from './actions';

const selectCurrentPage = state => state.get('currentPage');

const N_PER_PAGE=20;

function* loadMoreLogs(action) {
  const url = `http://localhost:4000/activities/${action.activityId}/logs`;
  try {
    yield put(loadingMoreLogs(action.activityId));
    const logs = yield call(request, url);
    yield put(loadedMoreLogs(action.activityId, fromJS(logs.data)));
    if (logs.length != N_PER_PAGE) {
      yield put(noMoreLogs(action.activityId));
    }
  } catch (err) {
    console.log(err);
  }
}

function* createLog(action) {
  const url = `http://localhost:4000/activities/${action.activityId}/logs`;
  try {
    yield put(creatingLog(action.activityId, action.log));
    const log = yield call(jsonPOST, url, { log: action.log.toJS() });
    yield put(createdLog(action.activityId, fromJS(log.data)));
  } catch (err) {
    console.log(err);
  }
}

export function* logSaga() {
  const loadMoreLogsWatcher = yield takeLatest(LOAD_MORE_LOGS, loadMoreLogs);
  const createLogWatcher = yield takeLatest(CREATE_LOG, createLog);

  yield take(LOCATION_CHANGE);
  yield cancel(loadMoreLogsWatcher);
  yield cancel(createLogWatcher);
}

export default [
  logSaga,
];
