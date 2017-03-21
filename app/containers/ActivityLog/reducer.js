/*
 *
 * ActivityLog reducer
 *
 */

import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  RESET,
  LOADING_MORE_LOGS,
  LOADED_MORE_LOGS,
  NO_MORE_LOGS,

  CREATING_LOG,
  CREATED_LOG,
} from './constants';

const initialState = fromJS({
  logs: [],
  currentPage: 0,
});

function activityLogReducer(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return initialState;
    case LOADING_MORE_LOGS:
      return state.set('loading', true);
    case LOADED_MORE_LOGS: {
      const logs = state.get('logs')
        .merge(action.logs.reverse());
      return state.set('logs', logs)
        .set('currentPage', action.currentPage)
        .set('loading', false);
    }
    case NO_MORE_LOGS:
      return state.set('noMore', true);
    case CREATING_LOG:
      return state.set('creating');
    case CREATED_LOG: {
      const logs = state.get('logs')
        .insert(0, action.log);
      return state.set('logs', logs)
        .set('creating', false);
    }
    default:
      return state;
  }
}

export default activityLogReducer;
