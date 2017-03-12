/*
 *
 * ActivityList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOADING_ACTIVITIES,
  SET_ACTIVITIES,

  CREATING_ACTIVITY,
  CREATED_ACTIVITY,
} from './constants';

import {
  UPDATING_ACTIVITY,
  UPDATED_ACTIVITY,
} from 'containers/ActivityList/constants';

const initialState = fromJS({
  activities: [],
  loading: false,
});

const activityForAction = (state, action) => state
  .get('activities')
  .find((activity) => activity.id == action.activity.id)

const activityIndex = (state, action) => state
  .get('activities')
  .find((activity) => activity.id == action.activity.id);

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

    case UPDATING_ACTIVITY: {
      const activities = state
        .get('activities')
        .update(activityIndex(state, action), () => activityForAction(state, action).set('updating', true));
      return state.set('activities', activities);
    }
    case UPDATED_ACTIVITY: {
      const activities = state
        .get('activities')
        .update(activityIndex(state, action), () => activityForAction(state, action));
      return state
        .set('activities', activities)
        .set('updating', false)
        .set('lastUpdate', new Date());
    }

    default:
      return state;
  }
}

export default settingsReducer;
