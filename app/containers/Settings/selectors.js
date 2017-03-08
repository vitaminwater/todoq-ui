import { createSelector } from 'reselect';

/**
 * Direct selector to the activityList state domain
 */
const selectSettingsDomain = () => (state) => state.get('settings');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Settings
 */

const makeSelectActivities = () => createSelector(
  selectSettingsDomain(),
  (activityListState) => activityListState.get('activities'),
);

export {
  makeSelectActivities,
  selectSettingsDomain,
};
