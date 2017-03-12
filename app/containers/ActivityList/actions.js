/*
 *
 * ActivityList actions
 *
 */

import {
  LOAD_DAY_ACTIVITIES,
  LOADING_DAY_ACTIVITIES,
  SET_DAY_ACTIVITIES,

  UPDATE_ACTIVITY,
  UPDATING_ACTIVITY,
  UPDATED_ACTIVITY,
} from './constants';

export function loadDayActivities() {
  return {
    type: LOAD_DAY_ACTIVITIES,
  };
}

export function loadingDayActivities() {
  return {
    type: LOADING_DAY_ACTIVITIES,
  }
}

export function setDayActivities(activities) {
  return {
    type: SET_DAY_ACTIVITIES,
    activities,
  }
}

export function updateActivity(activity) {
  return {
    type: UPDATE_ACTIVITY,
    activity,
  }
}

export function updatingActivity(activity) {
  return {
    type: UPDATING_ACTIVITY,
    activity,
  }
}

export function updatedActivity(activity) {
  return {
    type: UPDATED_ACTIVITY,
    activity,
  }
}
