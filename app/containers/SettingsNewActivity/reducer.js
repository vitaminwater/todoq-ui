/*
 *
 * SettingsNewActivity reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATING_ACTIVITY,
  CREATED_ACTIVITY,
  CREATE_ACTIVITY_ERROR,
} from 'common/constants';

const initialState = fromJS({});

function settingsNewActivityReducer(state = initialState, action) {
  switch (action.type) {
    case CREATING_ACTIVITY:
      return state.set('loading', true);
    case CREATED_ACTIVITY:
      return state.set('created', action.activity.get('id'))
                  .set('loading', false);
    case CREATE_ACTIVITY_ERROR:
      return state.set('loading', false)
                  .set('error', action.error);
    default:
      return state;
  }
}

export default settingsNewActivityReducer;
