/*
 *
 * ActivityList actions
 *
 */

import {
  LOAD_DAY_ACTIVITIES,
  LOADING_DAY_ACTIVITIES,
  SET_DAY_ACTIVITIES,
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
