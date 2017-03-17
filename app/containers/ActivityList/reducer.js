/*
 *
 * ActivityList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOADING_DAY_ACTIVITIES,
  SET_DAY_ACTIVITIES,
} from './constants';

import {
  UPDATING_ACTIVITY,
  UPDATED_ACTIVITY,
} from 'common/constants';

import {
  updatingActivity,
  updatedActivity
} from 'common/reducer';

const initialState = fromJS({
  activities: [],
  loading: false,
});

function activityListReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DAY_ACTIVITIES:
      return state.set('loading', true);
    case SET_DAY_ACTIVITIES:
      return state.set('activities', action.activities).set('loading', false);

    case UPDATING_ACTIVITY:
      return updatingActivity(state, action.activity);
    case UPDATED_ACTIVITY:
      return updatedActivity(state, action.activity);
    default:
      return state;
  }
}

export default activityListReducer;
