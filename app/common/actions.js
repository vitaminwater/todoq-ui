/*
 *
 * Common actions
 *
 */

import {
  UPDATE_ACTIVITY,
  UPDATING_ACTIVITY,
  UPDATED_ACTIVITY,

  CREATE_ACTIVITY,
  CREATING_ACTIVITY,
  CREATED_ACTIVITY,

  DELETE_ACTIVITY,
  DELETING_ACTIVITY,
  DELETED_ACTIVITY,
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
