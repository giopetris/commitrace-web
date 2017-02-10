import 'whatwg-fetch'

const API_ADDRESS = 'http://54.94.209.156:8050'

export const requestUsers = ({users, fromDate, toDate}) => {
  const formattedUsers = users.join(',')
  const ENDPOINT = `${API_ADDRESS}/?users=${formattedUsers}&from=${fromDate}&to=${toDate}`

  return fetch(ENDPOINT)
}

export default {requestUsers}
