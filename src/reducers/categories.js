
import {RECEIVE_CATEGORIES } from '../actions'
const INITIAL_STATE = { categories: [] };

function comments (state=INITIAL_STATE, action) {


  switch (action.type){

      case RECEIVE_CATEGORIES:
      return {...state,categories: action.data.categories}

      default:
        return state
  }
}






export default comments
