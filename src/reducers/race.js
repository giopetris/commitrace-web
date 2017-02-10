import reswitch from 'reswitch'

import {
  ADD_USER,
  REMOVE_USER,

  REQUEST_USERS,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAILURE
} from '../consts/race'

export const INITIAL_STATE = {
  isLoading: false,
  isLoaded: false,
  users: [],
  error: null
}

const race = (state = INITIAL_STATE, action) => {
  return reswitch(
    ADD_USER,
      {...state, users: state.users.concat(action.user)},

    REMOVE_USER, () => {
      if (!action.user.name) {
        return {...state} // TODO: figure out why we need this
      }

      return {...state, users: state.users.filter(user => user.name !== action.user.name)}
    },

    REQUEST_USERS,
      {...state, isLoading: true, users: []},

    REQUEST_USERS_SUCCESS,
      {...state, isLoading: false, users: action.users},

    REQUEST_USERS_FAILURE,
      {...state, isLoading: false, users: action.error}
  )(state, action.type)
}

export default race
