/*
 *
 * Common sagas
 *
 */

import { fromJS } from 'immutable';
import { postMultipart, putMultipart } from 'utils/request';
import { takeEvery, take, cancel, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { UPDATE_ACTIVITY, CREATE_ACTIVITY } from './constants';

import { updatingActivity, updatedActivity, creatingActivity, createdActivity } from './actions';

function* updateActivity(action) {
  const url = `http://localhost:4000/activities/${action.activity.get('id')}`;
  console.log('updateActivity');
  try {
    yield put(updatingActivity(action.activity));
    const activity = yield call(putMultipart, url, { activity: action.activity.toJS() });
    yield put(updatedActivity(fromJS(activity.data)));
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

function* commonSaga() {
  const updateActivityWatcher = yield takeEvery(UPDATE_ACTIVITY, updateActivity);
  const createActivityWatcher = yield takeEvery(CREATE_ACTIVITY, createActivity);
}

export default [
  commonSaga,
];
