import { fromJS } from 'immutable';
import { request } from 'utils/request';
import { takeLatest, take, cancel, call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_ACTIVITY } from './constants';
import { loadingActivity, setActivity } from './actions';

function* loadActivity(action) {
  const url = `http://localhost:4000/activities/${action.activityId}`;
  try {
    yield put(loadingActivity());
    const activity = yield call(request, url);
    yield put(setActivity(fromJS(activity.data)));
  } catch (err) {
    console.log(err);
  }
}

export function* settingsSaga() {
  const loadActivityWatcher = yield takeLatest(LOAD_ACTIVITY, loadActivity);

  yield take(LOCATION_CHANGE);
  yield cancel(loadActivityWatcher);
}

export default [
  settingsSaga,
];
