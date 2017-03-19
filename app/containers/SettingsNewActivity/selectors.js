import { createSelector } from 'reselect';

/**
 * Direct selector to the settingsNewActivity state domain
 */

const domain = () => state => state.get('settingsNewActivity');

export const createdSelector = () => createSelector(
  domain(),
  state => state.get('created')
)

export const loadingSelector = () => createSelector(
  domain(),
  state => state.get('loading')
)
