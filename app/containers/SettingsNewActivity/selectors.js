import { createSelector } from 'reselect';

/**
 * Direct selector to the settingsNewActivity state domain
 */
const selectSettingsNewActivityDomain = () => (state) => state.get('settingsNewActivity');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SettingsNewActivity
 */

const makeSelectSettingsNewActivity = () => createSelector(
  selectSettingsNewActivityDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSettingsNewActivity;
export {
  selectSettingsNewActivityDomain,
};
