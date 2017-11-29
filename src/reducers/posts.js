
import {ADD_POST,DELETE_POST,RECEIVE_POSTS,RECEIVE_POSTBYID,DOWNVOTE_POST,UPVOTE_POST,RECEIVE_POSTBYCATEGORY,EDIT_POST} from '../actions'
const INITIAL_STATE = { posts: [], post: null};


export default function posts (state = INITIAL_STATE, action) {

  switch (action.type){
    case ADD_POST:
      return {
        ...state,
        posts:[...state.posts,action.data]
      }
      case EDIT_POST:
        console.log("ID:" + JSON.stringify(action.id)  + "Post:" + JSON.stringify(action.post));
        return {

          posts : [...state.posts.map(post => post.id === action.id?{ ...post,...action.post }:post)]

        }
      case UPVOTE_POST:
        return {

          posts : [...state.posts.map(post => post.id === action.id?{ ...post, voteScore: action.voteScore }:post)]
         }
      case DOWNVOTE_POST:
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
        return { ...state.posts,posts:action.data}
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
