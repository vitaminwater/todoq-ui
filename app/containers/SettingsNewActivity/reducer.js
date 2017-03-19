/*
 *
 * SettingsNewActivity reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATING_ACTIVITY,
  CREATED_ACTIVITY,
} from 'common/constants';

const initialState = fromJS({});

function settingsNewActivityReducer(state = initialState, action) {
  switch (action.type) {
    case CREATING_ACTIVITY:
      return state.set('loading', true);
    case CREATED_ACTIVITY:
      return state.set('created', action.activity.get('id'));
    default:
      return state;
  }
}

export default settingsNewActivityReducer;
