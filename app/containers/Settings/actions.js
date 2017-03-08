/*
 *
 * ActivityList actions
 *
 */

import {
  LOAD_ACTIVITIES,
  LOADING_ACTIVITIES,
  SET_ACTIVITIES,
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
