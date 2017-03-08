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

const initialState = fromJS({
  activities: [],
  loading: false,
});

function activityListReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ACTIVITIES:
      return state.set('loading', true);
    case SET_ACTIVITIES:
      return state.set('activities', action.activities).set('loading', false);
    default:
      return state;
  }
}

export default activityListReducer;
