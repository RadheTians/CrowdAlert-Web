import {
  UPDATE_UPVOTES_LONG_POLL_STATUS,
  FETCH_UPVOTES_START,
  FETCH_UPVOTES_CANCEL,
  FETCH_UPVOTES_ERROR,
  FETCH_UPVOTES_SUCCESS,
  UPDATE_UPVOTE_START,
  UPDATE_UPVOTE_SUCCESS,
  UPDATE_UPVOTE_ERROR,
  UPDATE_UPVOTE_CANCEL,
} from './actionTypes';

export function updateUpvotesLongPollStatus(status) {
  return {
    type: UPDATE_UPVOTES_LONG_POLL_STATUS,
    payload: {
      status,
    },
  };
}
export function fetchUpvotesStart(uuid, currentCount, initialRequest) {
  return {
    type: FETCH_UPVOTES_START,
    payload: {
      uuid,
      currentCount,
      initialRequest,
    },
  };
}
export function fetchUpvotesSuccess({ response }) {
  return {
    type: FETCH_UPVOTES_SUCCESS,
    payload: {
      response,
    },
  };
}
export function fetchUpvotesCancel() {
  return {
    type: FETCH_UPVOTES_CANCEL,
  };
}
export function fetchUpvotesError({ message }) {
  return {
    type: FETCH_UPVOTES_ERROR,
    payload: {
      message,
    },
  };
}
export function updateUpvoteStart(uuid) {
  return {
    type: UPDATE_UPVOTE_START,
    payload: {
      uuid,
    },
  };
}
export function updateUpvoteSuccess({ response }) {
  return {
    type: UPDATE_UPVOTE_SUCCESS,
    payload: {
      response,
    },
  };
}
export function upvoteUpvoteError({ message }) {
  return {
    type: UPDATE_UPVOTE_ERROR,
    payload: {
      message,
    },
  };
}
export function updateUpvoteCancel() {
  return {
    type: UPDATE_UPVOTE_CANCEL,
  };
}
