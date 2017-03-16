import { fromJS } from 'immutable';
import { request, jsonPOST, postMultipart } from 'utils/request';
import { takeLatest, take, takeEvery, cancel, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_ACTIVITIES, CREATE_ACTIVITY } from './constants';

import { loadingActivities, setActivities, creatingActivity, createdActivity } from './actions';

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

export function* createActivity(action) {
  const url = 'http://localhost:4000/activities';

  try {
    yield put(creatingActivity(action.activity));
    const activity = yield call(postMultipart, url, { activity: action.activity.toJS() });
    yield put(createdActivity(fromJS(activity.data)));
  } catch (err) {
    console.log(err);
  }
}

export function* settingsSaga() {
  const loadActivitiesWatcher = yield takeLatest(LOAD_ACTIVITIES, loadActivities);
  const createActivityWatcher = yield takeEvery(CREATE_ACTIVITY, createActivity);

  yield take(LOCATION_CHANGE);
  yield cancel(loadActivitiesWatcher);
  yield cancel(createActivityWatcher);
}

export default [
  settingsSaga,
];
