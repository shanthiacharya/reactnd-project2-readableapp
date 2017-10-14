// import * as ReadableAPI from '../utils/api'

const api = "http://localhost:3001"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
  const headers = {
    'Accept': 'application/json',
    'Authorization': token
  }
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POSTBYID = 'RECEIVE_POSTBYID'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const receivePosts = data => ({
  type: RECEIVE_POSTS,
  data
});

export const receivePostsbyId = data => ({
  type: RECEIVE_POSTBYID,
  data
});

export const receiveComments = data => ({
  type: RECEIVE_COMMENTS,
  data
});
export const receiveCategories = data => ({
  type: RECEIVE_CATEGORIES,
  data
});

export const fetchAllPosts = () => dispatch => (

  fetch(`${api}/posts`, { headers })
  .then(res => res.json())
  .then(data => dispatch (receivePosts(data)) )

)
export const fetchAllCategories = () => dispatch => (
  fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => dispatch (receiveCategories(data)) )
)


export const fetchPostbyId = (id) => dispatch => (

  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.data)
  .then(data => dispatch (receivePostsbyId(data)) )

)

export const fetchCommentByPostId = (id) => dispatch => (


  fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json())
  .then(data => dispatch (receiveComments(data)) )


)
// TODO : Did this actually set the delete flag to true ,not showing up as true in redux dev tools
export const deleteByPostId = (id,deleted) => dispatch => (

  fetch(`${api}/posts/${id}`,{ Method:'DELETE',headers })
  .then(res => { res.json();} )
  .then(data =>  dispatch (deletePost(id,deleted)) )

)

// TODO : What data does it return ,  does it increment the voteScore
export const upVoteByPostId = (id,voteScore) => dispatch => (

  fetch(`${api}/posts/${id}`,{ method:'POST',body:JSON.stringify({option: "upVote"}),headers })
  .then(res => { res.json();} )
  // TODO : What data does it return ,  should I send data , it has nothing
  .then(data =>  dispatch (upvotePost(id,voteScore)) )

)

// TODO : What data does it return ,  does it decrement the voteScore
export const downVoteByPostId = (id,voteScore) => dispatch => (

  fetch(`${api}/posts/${id}`,{ method:'POST',body:JSON.stringify({option: "downVote"}), headers })
  .then(res => { res.json();} )
  .then(data =>  dispatch (downvotePost(id,voteScore)) )

)


export const addPost = (data) => ({
    type: 'ADD_POST',
    data

})

export const deletePost = (id,deleted) => ({
    type: 'DELETE_POST',
    id,
    deleted:true
})

export const upvotePost = (id,voteScore) => ({
    type: 'UPVOTE_POST',
    id,
    voteScore
})
export const downvotePost = (id,voteScore) => ({
    type: 'DOWNVOTE_POST',
    id,
    voteScore
})
