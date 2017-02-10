import {
  ADD_USER,
  REMOVE_USER,

  REQUEST_USERS,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAILURE
} from '../consts/race'

export const addUser = user => {
  return {
    type: ADD_USER,
    user
  }
}

export const removeUser = user => {
  return {
    type: REMOVE_USER,
    user
  }
}

export const requestUsers = ({users, fromDate, toDate}) => {
  return {
    type: REQUEST_USERS,
    users,
    fromDate,
    toDate
  }
}

export const requestUsersSuccess = race => {
  return {
    type: REQUEST_USERS_SUCCESS,
    users: race
  }
}

export const requestUsersFailure = error => {
  return {
    type: REQUEST_USERS_FAILURE,
    error
  }
}
