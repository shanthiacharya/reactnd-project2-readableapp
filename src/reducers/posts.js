
import {ADD_POST,DELETE_POST,RECEIVE_POSTS,RECEIVE_COMMENTS,RECEIVE_POSTBYID,DOWNVOTE_POST,UPVOTE_POST } from '../actions'
const INITIAL_STATE = { posts: [], post: null };
// const initialPostsState = [
//   {
//     id: null,
//     timestamp: null,
//     title : null,
//     body: null,
//     owner: null,
//     category: null
//   }
// ]

//state = [initialPostsState]
export default function posts (state = INITIAL_STATE, action) {


  switch (action.type){
    case ADD_POST:
      return {
        ...state,
        posts:[...state.posts,action.data]


      }
      case UPVOTE_POST:
        console.log ("Upvote : " + action.voteScore);
        console.log (state.posts )
        // state.posts.map ((post) => {if (post.id === action.id ) post.voteScore = action.voteScore++  })
        return {  ...state }
      case DOWNVOTE_POST:
        console.log ("Downvote : " + action.id  + action.voteScore);
          return {  ...state }
      case DELETE_POST:
        const postId = '45' //(action.id).trim();
        let new_posts
        console.log ("ID : " + postId )
        // console.log (state.posts )
        new_posts = state.posts.filter(post => {post.id != postId; console.log("post.id "+ post.id + " " + postId +"" +post.id != postId)})
        console.log ("After Filter:" +   new_posts.length )
        // console.log ("flag" + action.deleted)
      //  state.posts.posts[action.id]
        return {
          ...state
          // ...state,state.posts(post => post.id !== postId);
       }
      case RECEIVE_POSTS:
        return { ...state, posts:action.data}
      case RECEIVE_POSTBYID:
          // return {  post: action.data }
          return {  post: action.data }

     default:
        return state
  }
}
