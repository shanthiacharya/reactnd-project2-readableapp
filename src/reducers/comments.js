
import {RECEIVE_COMMENTS_BY_POSTID,ADD_COMMENT,EDIT_COMMENT,DELETE_COMMENT,UPVOTE_COMMENT,DOWNVOTE_COMMENT } from '../actions'
const INITIAL_STATE = { comments: [] };


//state = [initialPostsState]
function comments (state=INITIAL_STATE, action) {


  switch (action.type){


      case RECEIVE_COMMENTS_BY_POSTID:
      return {...state,
         comments: action.data
          }
      case ADD_COMMENT:
        return {
          comments: state.comments.concat(action.data)
        }
      case EDIT_COMMENT:
          return {
          comments : [...state.comments.map(comment => comment.id === action.id?{ ...comment,...action.data }:comment)]
        }

      case DELETE_COMMENT:
          const deleted_comment = action.data
          return {
            comments: [...state.comments.filter (comment => comment.id !== deleted_comment.id)]
         }
      case UPVOTE_COMMENT:
           return {
              comments : [...state.comments.map(comment => comment.id === action.id?{ ...comment, voteScore: action.voteScore }:comment)]
            }
      case DOWNVOTE_COMMENT:
             return {
               ...state,
                comments : [...state.comments.map(comment => comment.id === action.id?{ ...comment, voteScore: action.voteScore }:comment)]
              }

      default:
        return state
  }
}






export default comments
