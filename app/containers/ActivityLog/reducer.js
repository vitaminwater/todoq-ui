/*
 *
 * ActivityLog reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOADING_MORE_LOGS,
  LOADED_MORE_LOGS,
  NO_MORE_LOGS,
} from './constants';

const initialState = fromJS({
  logs: [],
  currentPage: 0,
});

function activityLogReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_MORE_LOGS:
      return state.set('loading', true);
    case LOADED_MORE_LOGS:
      const logs = state.get('logs')
                        .merge(action.logs);
      return state.set('logs', logs)
                  .set('currentPage', action.currentPage)
                  .set('loading', false);
    case NO_MORE_LOGS:
      return state.set('noMore', true);
    default:
      return state;
  }
}

export default activityLogReducer;
