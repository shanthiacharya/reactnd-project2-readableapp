
import {RECEIVE_COMMENTS,ADD_COMMENT,EDIT_COMMENT } from '../actions'
const INITIAL_STATE = { comments: [] };


//state = [initialPostsState]
function comments (state=INITIAL_STATE, action) {


  switch (action.type){

      case RECEIVE_COMMENTS:
      return { ...state, comments:action.data}
      case ADD_COMMENT:
        return {
          ...state,
          comments:[...state.comments,action.data]
        }
      case EDIT_COMMENT:
          console.log("ID:" + JSON.stringify(action.id)  + "Post:" + JSON.stringify(action.comment));
          return {
          comments : [...state.comments.map(comment => comment.id === action.id?{ ...comment,...action.comment }:comment)]

      }
      default:
        return state
  }
}






export default comments
