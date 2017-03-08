import { createSelector } from 'reselect';

/**
 * Direct selector to the activityList state domain
 */
const selectActivityListDomain = () => (state) => state.get('ActivityList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ActivityList
 */

const makeSelectActivities = () => createSelector(
  selectActivityListDomain(),
  (activityListState) => activityListState.get('activities'),
);

export {
  makeSelectActivities,
  selectActivityListDomain,
};
