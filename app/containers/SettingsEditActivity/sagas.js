import { fromJS } from 'immutable';
import { request } from 'utils/request';
import { takeLatest, take, cancel, call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

export function* settingsSaga() {
  yield take(LOCATION_CHANGE);
}

export default [
  settingsSaga,
];
