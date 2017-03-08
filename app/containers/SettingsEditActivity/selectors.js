import { createSelector } from 'reselect';

/**
 * Direct selector to the settingsEditActivity state domain
 */
const selectSettingsEditActivityDomain = () => (state) => state.get('settingsEditActivity');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SettingsEditActivity
 */

const makeSelectSettingsEditActivity = () => createSelector(
  selectSettingsEditActivityDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSettingsEditActivity;
export {
  selectSettingsEditActivityDomain,
};
