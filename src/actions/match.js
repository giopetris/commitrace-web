import {ADD_USER} from '../consts/match'

export const addUser = user => {
  return {
    type: ADD_USER,
    user
  }
}
