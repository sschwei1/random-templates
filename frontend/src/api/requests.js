// post request
export const AddUser = (user) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch('/api/user/add', fetchOptions)
    .then(res => res.json())
    .then(data => {
      return {
        payload: data.payload ?? undefined,
        error: data.error ?? undefined
      };
    })
    .catch(err => ({payload: undefined, error: err.message}))
}

// get request
export const getUserList = (queryParams) => {
  return fetch('/api/user/list?' + new URLSearchParams(queryParams))
    .then(res => res.json())
    .then(data => {
      return {
        payload: data.payload ?? undefined,
        error: data.error ?? undefined
      };
    })
    .catch(err => ({payload: undefined, error: err.message}))
}