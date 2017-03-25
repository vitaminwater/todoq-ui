import { fromJS } from 'immutable';
import { join, leave } from 'common/socket';
import { request, jsonPOST } from 'utils/request';
import { take, takeLatest, takeEvery, fork, call, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  LOAD_MORE_LOGS,
  CREATE_LOG,

  SUBSCRIBE_ACTIVITY,
  UNSUBSCRIBE_ACTIVITY,
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

const startWebsocket = (c) => {
  return {
    close: () => socket.close(),
  }
}

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

function* subscribeLog(action) {
  const channel = yield call(join(`logs:${action.activityId}`, 'log:insert'));

  yield fork(function* () {
    try {
      while (true) {
        const log = yield take(channel);
        console.log(log);
      }
    } catch (err) {
      console.log(err);
    }
  });
}

function* unsubscribeLog(action) {
  leave(`activity:${action.activityId}`);
}

export function* logSaga() {
  const loadMoreLogsWatcher = yield takeLatest(LOAD_MORE_LOGS, loadMoreLogs);
  const createLogWatcher = yield takeLatest(CREATE_LOG, createLog);
  const subscribeLogWatcher = yield takeEvery(SUBSCRIBE_ACTIVITY, subscribeLog);
  const unsubscribeLogWatcher = yield takeEvery(UNSUBSCRIBE_ACTIVITY, unsubscribeLog);

  yield take(LOCATION_CHANGE);
  yield cancel(loadMoreLogsWatcher);
  yield cancel(createLogWatcher);
  yield cancel(subscribeLogWatcher);
  yield cancel(unsubscribeLogWatcher);
}

export default [
  logSaga,
];
