/*
 *
 * ActivityList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOADING_DAY_ACTIVITIES,
  SET_DAY_ACTIVITIES,

  UPDATING_ACTIVITY,
  UPDATED_ACTIVITY,
} from './constants';

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

function activityListReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DAY_ACTIVITIES:
      return state.set('loading', true);
    case SET_DAY_ACTIVITIES:
      return state.set('activities', action.activities).set('loading', false);

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

export default activityListReducer;
