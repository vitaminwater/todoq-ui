/*
 *
 * Common reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({
  activities: [],
  loading: false,
});

const activityIndex = (state, activity) => state
  .get('activities')
  .findIndex((a) => a.get('id') == activity.get('id'));

export const updatingActivity = (state, activity) => {
  const activities = state
    .get('activities')
    .update(activityIndex(state, activity), (a) => a.set('updating', true));
  return state.set('activities', activities);
}

export const updatedActivity = (state, activity) => {
  const activities = state
    .get('activities')
    .update(activityIndex(state, activity), (a) => activity);
  return state
    .set('activities', activities)
    .set('updating', false)
    .set('lastUpdate', new Date());
}
