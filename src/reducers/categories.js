
import {RECEIVE_CATEGORIES } from '../actions'
const INITIAL_STATE = { categories: [] };


//state = [initialPostsState]
function comments (state=INITIAL_STATE, action) {


  switch (action.type){

      case RECEIVE_CATEGORIES:
      console.log (action.data.categories)
      return {...state,categories: action.data.categories}

      default:
        return state
  }
}






export default comments
