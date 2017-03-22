/*
 *
 * Common actions
 *
 */

import {
  UPDATE_ACTIVITY,
  UPDATING_ACTIVITY,
  UPDATED_ACTIVITY,
  UPDATE_ACTIVITY_ERROR,

  CREATE_ACTIVITY,
  CREATING_ACTIVITY,
  CREATED_ACTIVITY,
  CREATE_ACTIVITY_ERROR,

  DELETE_ACTIVITY,
  DELETING_ACTIVITY,
  DELETED_ACTIVITY,
  DELETE_ACTIVITY_ERROR,

  LOAD_ACTIVITY,
  SET_ACTIVITY,
  LOADING_ACTIVITY,
} from './constants';

export function createActivity(activity) {
  return {
    type: CREATE_ACTIVITY,
    activity,
  }
}

export function creatingActivity(activity) {
  return {
    type: CREATING_ACTIVITY,
    activity,
  }
}

export function createdActivity(activity) {
  return {
    type: CREATED_ACTIVITY,
    activity,
  }
}

export function createActivityError(activity, error) {
  return {
    type: CREATE_ACTIVITY_ERROR,
    activity,
    error,
  }
}

export function updateActivity(activity) {
  return {
    type: UPDATE_ACTIVITY,
    activity,
  }
}

export function updatingActivity(activity) {
  return {
    type: UPDATING_ACTIVITY,
    activity,
  }
}

export function updatedActivity(activity) {
  return {
    type: UPDATED_ACTIVITY,
    activity,
  }
}

export function updateActivityError(activity, error) {
  return {
    type: UPDATE_ACTIVITY_ERROR,
    activity,
    error,
  }
}

export function deleteActivity(activity) {
  return {
    type: DELETE_ACTIVITY,
    activity,
  }
}

export function deletingActivity(activity) {
  return {
    type: DELETING_ACTIVITY,
    activity,
  }
}

export function deletedActivity(activity) {
  return {
    type: DELETED_ACTIVITY,
    activity,
  }
}

export function deleteActivityError(activity, error) {
  return {
    type: DELETE_ACTIVITY_ERROR,
    activity,
    error
  }
}

export function loadActivity(activityId) {
  return {
    type: LOAD_ACTIVITY,
    activityId,
  };
}

export function loadingActivity() {
  return {
    type: LOADING_ACTIVITY,
  }
}

export function setActivity(activity) {
  return {
    type: SET_ACTIVITY,
    activity,
  }
}
