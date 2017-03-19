import { createSelector } from 'reselect';

/**
 * Other specific selectors
 */

const domain = () => state => state.get('settingsEditActivity');

/**
 * Default selector used by SettingsEditActivity
 */

export const activitySelector = () => createSelector(
  domain(),
  state => state.get('activity')
);

export const loadingSelector = () => createSelector(
  domain(),
  state => state.get('loading'),
);

export const errorSelector = () => createSelector(
  domain(),
  state => state.get('error'),
);
