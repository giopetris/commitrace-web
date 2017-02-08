import reducer, {INITIAL_STATE} from '../match'

import {ADD_USER} from '../../consts/match'

it('returns initial state', () => {
  expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
})

it('returns state with added user on ADD_USER', () => {
  const fakeUser = {name: 'chiefGui'}
  const action = {type: ADD_USER, user: fakeUser}
  const actualState = INITIAL_STATE
  const expectedState = {
    ...actualState,
    users: [action.user]
  }

  expect(reducer(actualState, action)).toEqual(expectedState)
})
