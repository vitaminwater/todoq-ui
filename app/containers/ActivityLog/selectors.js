import { createSelector } from 'reselect';

/**
 * Direct selector to the activityLog state domain
 */
const domain = () => state => state.get('activityLog');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ActivityLog
 */

export const activitySelector = () => createSelector(
  domain(),
  state => state.get('activity'),
)

export const logsSelector = () => createSelector(
  domain(),
  state => state.get('logs'),
);

export const loadingSelector = () => createSelector(
  domain(),
  state => state.get('loading'),
);
