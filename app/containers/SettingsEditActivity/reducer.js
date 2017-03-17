/*
 *
 * SettingsEditActivity reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOADING_ACTIVITY,
  SET_ACTIVITY,
} from './constants';

const initialState = fromJS({});

function settingsEditActivityReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ACTIVITY:
      return state.set('loading', true);
    case SET_ACTIVITY:
      return state.set('activity', action.activity)
                  .set('loading', true);
    default:
      return state;
  }
}

export default settingsEditActivityReducer;
