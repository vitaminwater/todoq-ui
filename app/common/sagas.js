/*
 *
 * Common sagas
 *
 */

import { fromJS } from 'immutable';
import { postMultipart, putMultipart, deleteRequest } from 'utils/request';
import { takeEvery, take, cancel, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { UPDATE_ACTIVITY, DELETE_ACTIVITY, CREATE_ACTIVITY } from './constants';

import { updatingActivity, updatedActivity, updateActivityError, creatingActivity, createdActivity, createActivityError, deletingActivity, deletedActivity, deleteActivityError } from './actions';

function* updateActivity(action) {
  const url = `http://localhost:4000/activities/${action.activity.get('id')}`;
  try {
    yield put(updatingActivity(action.activity));
    const activity = yield call(putMultipart, url, { activity: action.activity.toJS() });
    yield put(updatedActivity(fromJS(activity.data)));
  } catch (err) {
    yield put(updateActivityError(action.activity, err));
    console.log(err);
  }
}

function* deleteActivity(action) {
  const url = `http://localhost:4000/activities/${action.activity.get('id')}`;
  try {
    yield put(deletingActivity(action.activity));
    const activity = yield call(deleteRequest, url);
    yield put(deletedActivity(action.activity));
  } catch (err) {
    yield put(deleteActivityError(action.activity, err));
    console.log(err);
  }
}

function* createActivity(action) {
  const url = 'http://localhost:4000/activities';

  try {
    yield put(creatingActivity(action.activity));
    const activity = yield call(postMultipart, url, { activity: action.activity.toJS() });
    yield put(createdActivity(fromJS(activity.data)));
  } catch (err) {
    yield put(createActivityError(action.activity, err));
    console.log(err);
  }
}

function* commonSaga() {
  const updateActivityWatcher = yield takeEvery(UPDATE_ACTIVITY, updateActivity);
  const deleteActivityWatcher = yield takeEvery(DELETE_ACTIVITY, deleteActivity);
  const createActivityWatcher = yield takeEvery(CREATE_ACTIVITY, createActivity);
}

export default [
  commonSaga,
];
