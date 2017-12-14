// import * as ReadableAPI from '../utils/api'

const api = "http://localhost:3001"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
  const headers = {

    'Content-Type': 'application/json',
    'Authorization':' Basic amFzb25oaWNrOg=='
  }
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POSTBYID = 'RECEIVE_POSTBYID'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const RECEIVE_COMMENTS_BY_POSTID = 'RECEIVE_COMMENTS_BY_POSTID'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTBYCATEGORY = 'RECEIVE_POSTBYCATEGORY'


export const receivePosts = data => ({
  type: RECEIVE_POSTS,
  data
});

export const receivePostsbyId = data => ({
  type: RECEIVE_POSTBYID,
  data
});

export const receivePostsbyCategory = data => ({
  type: RECEIVE_POSTBYCATEGORY,
  data
});

export const receiveComments = (data,postid) => ({
  type: RECEIVE_COMMENTS_BY_POSTID,
  data,
  postid
});
export const receiveCategories = data => ({
  type: RECEIVE_CATEGORIES,
  data
});
export const addPost = (data) => ({
    type: 'ADD_POST',
    data

})

export const editPost = (id,post) => ({
  type: 'EDIT_POST',
  id,
  post
})

export const deletePost = (data) => ({
    type: 'DELETE_POST',
    data
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

export const addComment = (data,parentId) => ({
    type: 'ADD_COMMENT',
    data,
    parentId

})
export const editComment = (id,comment) =>({
  type: EDIT_COMMENT,
  id,
  comment
})

export const deleteComment = (data) => ({
    type: 'DELETE_COMMENT',
    data
})

export const upvoteComment = (id,voteScore) => ({
    type: 'UPVOTE_COMMENT',
    id,
    voteScore
})
export const downvoteComment = (id,voteScore) => ({
    type: 'DOWNVOTE_COMMENT',
    id,
    voteScore
})





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
  .then(res => res.json())
  .then(data => dispatch (receivePostsbyId(data)) )
  .catch(e => requestError(e))
)

// export const fetchPostbyId = (id) => dispatch => (
//   dispatch (receivePostsbyId(id))
// )

export const fetchPostbyCategory = (category) => dispatch => (
  fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json())
  .then(data => dispatch (receivePostsbyCategory(data)) )
  .catch(e => requestError(e))
)

export const fetchCommentByPostId = (postid) => dispatch => (
  fetch(`${api}/posts/${postid}/comments`, { headers })
  .then(res => res.json())
  .then(data =>  dispatch (receiveComments(data,postid)) )
  .catch(e => requestError(e))
)

function requestError(e) {
    console.log(e);
  }

  export const creatNewPost = (post) => dispatch => (

    fetch(`${api}/posts/`,{method:'POST',
         headers,
           body: JSON.stringify({ "id":post.id,"timestamp":post.timestamp, "title":post.title, "body":post.body,
           "author":post.author, "category":post.category,"voteScore": 0,"deleted": false,"commentCount": 0})
     })
    .then(res => res.json() )
    .then(data => dispatch (addPost(data)) )
    .catch(e => requestError(e))
  )

  export const creatNewComment = (comment,parentId) => dispatch => (
    fetch(`${api}/comments`,{ method:'POST',
        headers,
        body:JSON.stringify({"id":comment.id,"timestamp":comment.timestamp, "title":comment.title, "body":comment.body,
        "author":comment.author,"parentId":comment.parentId, "voteScore": 0,"deleted": false,"parentDeleted": false})
     })
    .then(res =>  res.json()  )
    .then(data =>  dispatch (addComment(data,parentId)) )

    .catch(e => requestError(e))
  )



export const editByPostId = (id,post) => dispatch => (
  fetch(`${api}/posts/${id}`,{ method:'PUT',headers })
  .then(res => res.json() )
  .then(data => dispatch (editPost(id,post)) )
  .catch(e => requestError(e))
)

export const editByCommentId = (id,comment) => dispatch => (
  fetch(`${api}/comments/${id}`,{ method:'PUT',headers })
  .then(res => res.json() )
  .then(data => dispatch (editComment(id,comment)) )
  .catch(e => requestError(e))
)


export const deleteByPostId = (id,deleted) => dispatch => (

  fetch(`${api}/posts/${id}`,{ method:'DELETE',headers })
  .then(res => res.json() )
  .then(data =>   dispatch (deletePost(data)) )
  .catch(e => requestError(e))

)

export const deleteByCommentId = (id,deleted) => dispatch => (

  fetch(`${api}/comments/${id}`,{ method:'DELETE',headers })
  .then(res => res.json() )
  .then(data =>   dispatch (deleteComment(data)) )
  .catch(e => requestError(e))

)



export const upVoteByPostId = (id,voteScore) => dispatch => (

  fetch(`${api}/posts/${id}`,{ method:'POST',body:JSON.stringify({option:"upVote"}),headers })
  .then(res => { res.json();} )
  .then(data =>  dispatch (upvotePost(id,voteScore)) )

)


export const downVoteByPostId = (id,voteScore) => dispatch => (
  fetch(`${api}/posts/${id}`,{ method:'POST',body:JSON.stringify({option: "downVote"}), headers })
  .then(res => { res.json();} )
  .then(data =>  dispatch (downvotePost(id,voteScore)) )

)

export const upVoteByCommentId = (id,voteScore) => dispatch => (
  fetch(`${api}/comments/${id}`,{ method:'POST',body:JSON.stringify({option:"upVote"}),headers })
  .then(res => { res.json();} )
  .then(data =>  dispatch (upvoteComment(id,voteScore)) )
)


export const downVoteByCommentId = (id,voteScore) => dispatch => (
  fetch(`${api}/comments/${id}`,{ method:'POST',body:JSON.stringify({option: "downVote"}), headers })
  .then(res => { res.json();} )
  .then(data =>  dispatch (downvoteComment(id,voteScore)) )

)
