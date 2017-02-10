import 'whatwg-fetch'

const API_ADDRESS = 'http://54.94.209.156:8050'

export const requestUsers = async ({users, fromDate, toDate}) => {
  const formattedUsers = users.join(',')
  const ENDPOINT = `${API_ADDRESS}/?users=${formattedUsers}&from=${fromDate}&to=${toDate}`
  const response = await fetch(ENDPOINT)

  return response.json()
}

export default {requestUsers}
