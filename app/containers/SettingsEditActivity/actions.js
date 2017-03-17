/*
 *
 * SettingsEditActivity actions
 *
 */

import {
  LOAD_ACTIVITY,
  SET_ACTIVITY,
  LOADING_ACTIVITY,
} from './constants';

export function loadActivity(activityId) {
  return {
    type: LOAD_ACTIVITY,
    activityId,
  };
}

export function loadingActivity() {
  return {
    type: LOADING_ACTIVITY,
  }
}

export function setActivity(activity) {
  return {
    type: SET_ACTIVITY,
    activity,
  }
}
