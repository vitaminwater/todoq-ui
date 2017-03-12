import { fromJS } from 'immutable';
import { jsonPOST } from 'utils/request';
import { takeLatest, take, cancel, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_ACTIVITIES, UPDATE_ACTIVITY } from './constants';

import { loadingDayActivities, setDayActivities } from './actions';
import { updatingActivity, updatedActivity } from './actions';

function* loadDayActivities(action) {
  const url = 'http://localhost:4000/activities';
  try {
    yield put(loadingDayActivities());
    const activities = yield call(request, url);
    yield put(setDayActivities(fromJS(activities.data)));
  } catch (err) {
    console.log(err);
  }
}

function* updateActivity(action) {
  const url = `http://localhost:4000/activity/${action.activity.id}`;
  try {
    yield put(updatingActivity(action.activity));
    const activity = yield call(jsonPOST, url, { activity: action.activity.toJS() });
    yield put(updatedActivity(fromJS(activity.data)));
  } catch (err) {
    console.log(err);
  }
}

function* activitiesSaga() {
  const loadDayActivitiesWatcher = yield takeLatest(LOAD_DAY_ACTIVITIES, loadDayActivities);
  const updateActivity = yield takeLatest(UPDATE_ACTIVITY, updateActivity);

  yield take(LOCATION_CHANGE);
  yield cancel(loadDayActivitiesWatcher);
}

export default [
  activitiesSaga,
];
