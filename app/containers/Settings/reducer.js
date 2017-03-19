/*
 *
 * ActivityList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOADING_ACTIVITIES,
  SET_ACTIVITIES,
} from './constants';

import {
  CREATING_ACTIVITY,
  CREATED_ACTIVITY,

  UPDATING_ACTIVITY,
  UPDATED_ACTIVITY,
  
  DELETING_ACTIVITY,
  DELETED_ACTIVITY,
} from 'common/constants';

import {
  updatingActivity,
  updatedActivity,
  deletingActivity,
  deletedActivity,
} from 'common/reducer';

const initialState = fromJS({
  activities: [],
  loading: false,
});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ACTIVITIES:
      return state.set('loading', true);
    case SET_ACTIVITIES:
      return state.set('activities', action.activities).set('loading', false);

    case CREATING_ACTIVITY:
      return state
        .set('creatingActivity', true);
    case CREATED_ACTIVITY:
      const activities = state
        .get('activities')
        .insert(0, action.activity);
      return state
        .set('activities', activities)
        .set('creatingActivity', false);

    case UPDATING_ACTIVITY:
      return updatingActivity(state, action.activity);
    case UPDATED_ACTIVITY:
      return updatedActivity(state, action.activity);

    case DELETING_ACTIVITY:
      return deletingActivity(state, action.activity);
    case DELETED_ACTIVITY:
      return deletedActivity(state, action.activity);

    default:
      return state;
  }
}

export default settingsReducer;
