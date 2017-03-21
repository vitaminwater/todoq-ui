/*
 *
 * ActivityLog actions
 *
 */

import {
  LOAD_MORE_LOGS,
  LOADING_MORE_LOGS,
  LOADED_MORE_LOGS,
  NO_MORE_LOGS,

  CREATE_LOG,
  CREATING_LOG,
  CREATED_LOG,
} from './constants';

export function loadMoreLogs(activityId) {
  return {
    type: LOAD_MORE_LOGS,
    activityId,
  };
}

export function loadingMoreLogs(activityId) {
  return {
    type: LOADING_MORE_LOGS,
    activityId,
  }
}

export function loadedMoreLogs(activityId, logs, currentPage) {
  return {
    type: LOADED_MORE_LOGS,
    activityId,
    logs,
    currentPage,
  }
}

export function noMoreLogs(activityId) {
  return {
    type: NO_MORE_LOGS,
    activityId,
  };
}

export function createLog(activityId, log) {
  return {
    type: CREATE_LOG,
    activityId,
    log
  };
}

export function creatingLog(activityId, log) {
  return {
    type: CREATING_LOG,
    activityId,
    log
  }
}

export function createdLog(activityId, log) {
  return {
    type: CREATED_LOG,
    activityId,
    log
  }
}
