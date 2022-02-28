// post request
export const AddUser = (user) => {
  console.log('User added:', user);
}

// get request
export const getUserList = (queryParams) => {
  return fetch('/api/userList?' + new URLSearchParams(queryParams))
    .then(res => res.json())
    .then(data => ({payload: data, error: undefined}))
    .catch(err => ({payload: undefined, error: err.message}))
}