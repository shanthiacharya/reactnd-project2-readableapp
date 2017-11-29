
import { combineReducers } from 'redux'
import posts from './posts'
import comments from './comments'
import categories from './categories'
import sortorder from './sortorder'

export default combineReducers({
  posts,
  comments,
  categories,
  sortorder
})
