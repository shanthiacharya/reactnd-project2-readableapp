
import {RECEIVE_COMMENTS,ADD_COMMENT } from '../actions'
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
      default:
        return state
  }
}






export default comments
