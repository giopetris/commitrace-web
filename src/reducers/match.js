import reswitch from 'reswitch'

import {ADD_USER, REMOVE_USER} from '../consts/match'

export const INITIAL_STATE = {
  users: [],
  hasStarted: false
}

const match = (state = INITIAL_STATE, action) => {
  return reswitch(
    ADD_USER,
      {...state, users: state.users.concat(action.user)},

    REMOVE_USER,
      () => {
        return {...state, users: state.users.filter(user => user.name !== action.user.name)}
      }
  )(state, action.type)
}

export default match
