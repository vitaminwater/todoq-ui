/*
 *
 * ActivityList actions
 *
 */

import {
  LOAD_ACTIVITIES,
  LOADING_ACTIVITIES,
  SET_ACTIVITIES,

  CREATE_ACTIVITY,
  CREATING_ACTIVITY,
  CREATED_ACTIVITY,
} from './constants';

export function loadActivities() {
  return {
    type: LOAD_ACTIVITIES,
  };
}

export function loadingActivities() {
  return {
    type: LOADING_ACTIVITIES,
  }
}

export function setActivities(activities) {
  return {
    type: SET_ACTIVITIES,
    activities,
  }
}

export function createActivity(activity) {
  return {
    type: CREATE_ACTIVITY,
    activity,
  }
}

export function creatingActivity(activity) {
  return {
    type: CREATING_ACTIVITY,
    activity,
  }
}

export function createdActivity(activity) {
  return {
    type: CREATED_ACTIVITY,
    activity,
  }
}
