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

  UPDATING_LOG,
  UPDATED_LOG,
} from './constants';

import {
  LOADING_ACTIVITY,
  SET_ACTIVITY,
} from 'common/constants';

const initialState = fromJS({
  logs: [],
  currentPage: 0,
});

const logIndex = (state, log) => state
  .get('logs')
  .findIndex((l) => l.get('id') == log.get('id'));

function activityLogReducer(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return initialState;
    case LOADING_ACTIVITY:
      return state.set('loading', true);
    case SET_ACTIVITY:
      return state.set('activity', action.activity)
                  .set('loading', false);
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
      if (logIndex(state, action.log) !== -1) return state;
      const logs = state.get('logs')
        .insert(0, action.log);
      return state.set('logs', logs)
        .set('creating', false);
    }
    case UPDATING_LOG:
      return state.set('updating', action.log.get('id'));
    case UPDATED_LOG: {
      const logs = state.get('logs')
        .update(logIndex(state, action.log), (l) => action.log);
      return state.set('logs', logs)
        .set('updating', false);
    }

    default:
      return state;
  }
}

export default activityLogReducer;
