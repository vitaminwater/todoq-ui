import { createSelector } from 'reselect';

/**
 * Direct selector to the activityLog state domain
 */
const domain = () => (state) => state.get('activityLog');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ActivityLog
 */

const logsSelector = () => createSelector(
  domain(),
  (state) => state.get('logs'),
);

const loadingSelector = () => createSelector(
  domain(),
  (state) => state.get('loading'),
);

export {
  logsSelector,
  loadingSelector,
};
