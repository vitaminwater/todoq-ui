import { fromJS } from 'immutable';
import { request, } from 'utils/request';
import { takeLatest, take, cancel, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_DAY_ACTIVITIES, } from './constants';
import { UPDATE_ACTIVITY } from 'common/constants';

import { loadingDayActivities, setDayActivities } from './actions';

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

function* activitiesSaga() {
  const loadDayActivitiesWatcher = yield takeLatest(LOAD_DAY_ACTIVITIES, loadDayActivities);

  yield take(LOCATION_CHANGE);
  yield cancel(loadDayActivitiesWatcher);
}

export default [
  activitiesSaga,
];
