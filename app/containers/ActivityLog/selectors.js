import { createSelector } from 'reselect';

/**
 * Direct selector to the activityLog state domain
 */
const selectActivityLogDomain = () => (state) => state.get('activityLog');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ActivityLog
 */

const makeSelectActivityLog = () => createSelector(
  selectActivityLogDomain(),
  (substate) => substate.toJS()
);

export default makeSelectActivityLog;
export {
  selectActivityLogDomain,
};
