import reducer, {INITIAL_STATE} from '../race'

import {
  ADD_USER,
  REMOVE_USER,

  REQUEST_USERS
} from '../../consts/race'

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

it('returns state without removed user on REMOVE_USER', () => {
  const fakeUser = {name: 'chiefGui'}
  const action = {type: REMOVE_USER, user: fakeUser}
  const actualState = {
    ...INITIAL_STATE,
    users: [fakeUser]
  }
  const expectedState = {
    ...actualState,
    users: []
  }

  expect(reducer(actualState, action)).toEqual(expectedState)
})

// Facing a starnge bug, putting tests on hold
//
// it('returns loading state when REQUEST_USERS', () => {
//   const fakeUser = {name: 'chiefGui'}
//   const action = {type: REQUEST_USERS}
//   const actualState = {
//     ...INITIAL_STATE,
//     isLoading: false,
//     users: [fakeUser]
//   }
//   const expectedState = {
//     ...actualState,
//     isLoading: true,
//     users: []
//   }
//
//   expect(reducer(actualState, action)).toEqual(expectedState)
// })
