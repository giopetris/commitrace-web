import reswitch from 'reswitch'

import {ADD_USER} from '../consts/match'

export const INITIAL_STATE = {
  users: [],
  hasStarted: false
}

const match = (state = INITIAL_STATE, action) => {
  return reswitch(
    ADD_USER,
      {...state, users: state.users.concat(action.user)}
  )(state, action.type)
}

export default match
