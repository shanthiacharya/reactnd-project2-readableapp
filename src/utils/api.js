

const api = "http://localhost:3001"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchAllCategories = () =>
  fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)


export const fetchByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)


export const fetchAllPosts = () =>

      fetch(`${api}/posts`, { headers })
      .then(res => res.json())
