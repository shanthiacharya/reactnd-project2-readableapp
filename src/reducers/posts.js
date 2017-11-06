
import {ADD_POST,DELETE_POST,RECEIVE_POSTS,RECEIVE_POSTBYID,DOWNVOTE_POST,UPVOTE_POST,RECEIVE_POSTBYCATEGORY } from '../actions'
const INITIAL_STATE = { posts: [], post: null};


export default function posts (state = INITIAL_STATE, action) {

  switch (action.type){
    case ADD_POST:
      return {
        ...state,
        posts:[...state.posts,action.data]
      }
      case UPVOTE_POST:
        // TODO : How do I get the data
        console.log ("Upvote : " + action.voteScore);
        console.log (state.posts )
        return {

          posts : [...state.posts.map(post => post.id === action.id?{ ...post, voteScore: action.voteScore }:post)]
         }
      case DOWNVOTE_POST:
          // TODO : How do I get the data
          console.log ("Downvote : " + action.id  + action.voteScore);
          return {
            ...state,
            posts : [...state.posts.map(post => post.id === action.id?{ ...post, voteScore: action.voteScore }:post)]
           }
      case DELETE_POST:
        return {
          posts: [...state.posts.filter (post => post.id !== action.id)]
       }
      case RECEIVE_POSTS:
        return { ...state.posts, posts:action.data}
        // return {posts:action.data}
      case RECEIVE_POSTBYCATEGORY:
        return { posts:action.data}
      case RECEIVE_POSTBYID:
          // return {...state, post: action.data }
          console.log ("RECEIVE_POSTBYI : " + action.id + action.data);
          return {
            ...state,
            post: [...state.posts.filter (post => post.id === action.data)]

         }

      default:
        return state
  }
}
