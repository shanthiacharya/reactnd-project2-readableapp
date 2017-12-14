
import {ADD_POST,DELETE_POST,RECEIVE_POSTS,RECEIVE_POSTBYID,DOWNVOTE_POST,UPVOTE_POST,RECEIVE_POSTBYCATEGORY,EDIT_POST} from '../actions'
const INITIAL_STATE = { posts: [], post: null};


export default function posts (state = INITIAL_STATE, action) {

  switch (action.type){
    case ADD_POST:
      return {
         ...state,
         posts: state.posts.concat(action.data)
      }
      case EDIT_POST:
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
        const deleted_post = action.data
        return {
          posts: [...state.posts.filter (post => post.id !== deleted_post.id)]
       }
      case RECEIVE_POSTS:
        return { ...state.posts, posts:action.data
        }
      case RECEIVE_POSTBYCATEGORY:
        return { ...state.posts,posts:action.data
        }
      case RECEIVE_POSTBYID:
          return {...state, post: action.data
          }

      default:
        return state
  }
}
