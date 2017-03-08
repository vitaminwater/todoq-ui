/*
 *
 * ActivityList actions
 *
 */

import {
  LOAD_ACTIVITIES,
} from './constants';

export function loadActivities() {
  return {
    type: LOAD_ACTIVITIES,
  };
}
