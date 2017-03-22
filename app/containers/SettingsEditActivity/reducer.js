/*
 *
 * SettingsEditActivity reducer
 *
 */

import { fromJS } from 'immutable';
import {
} from './constants';

import {
  UPDATING_ACTIVITY,
  UPDATED_ACTIVITY,
  UPDATE_ACTIVITY_ERROR,
  LOADING_ACTIVITY,
  SET_ACTIVITY,
} from 'common/constants';

const initialState = fromJS({});

function settingsEditActivityReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ACTIVITY:
      return state.set('loading', true);
    case SET_ACTIVITY:
      return state.set('activity', action.activity)
                  .set('loading', false);
    case UPDATING_ACTIVITY:
      return state.set('loading', true);
    case UPDATED_ACTIVITY:
      return state.set('activity', action.activity)
                  .set('loading', false);
    case UPDATE_ACTIVITY_ERROR:
      return state.set('loading', false)
             .set('error': action.error);
    default:
      return state;
  }
}

export default settingsEditActivityReducer;
