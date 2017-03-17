/*
 *
 * Settings sagas
 *
 */

import { fromJS } from 'immutable';
import { request } from 'utils/request';
import { takeLatest, take, takeEvery, cancel, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_ACTIVITIES } from './constants';

import { loadingActivities, setActivities } from './actions';

export function* loadActivities(action) {
  const url = 'http://localhost:4000/activities';
  try {
    yield put(loadingActivities());
    const activities = yield call(request, url);
    yield put(setActivities(fromJS(activities.data)));
  } catch (err) {
    console.log(err);
  }
}

export function* settingsSaga() {
  const loadActivitiesWatcher = yield takeLatest(LOAD_ACTIVITIES, loadActivities);

  yield take(LOCATION_CHANGE);
  yield cancel(loadActivitiesWatcher);
}

export default [
  settingsSaga,
];
