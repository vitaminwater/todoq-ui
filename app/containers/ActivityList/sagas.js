// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_ACTIVITIES } from './constants';

export function* loadActivities(action) {
  console.log(action);
}

export function* activitiesSaga() {
  const watcher = yield takeLatest(LOAD_ACTIVITIES, loadActivities);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  activitiesSaga,
];
