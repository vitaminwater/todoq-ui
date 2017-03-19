import { createSelector } from 'reselect';

/**
 * Other specific selectors
 */


/**
 * Default selector used by SettingsEditActivity
 */

export const makeSelectSettingsEditActivity = () => state => state.getIn(['settingsEditActivity', 'activity'])

export const makeSelectSettingsEditLoading = () => state => state.getIn(['settingsEditActivity', 'loading'])
