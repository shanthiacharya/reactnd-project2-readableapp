
import {ADD_POST,DELETE_POST,RECEIVE_POSTS,RECEIVE_COMMENTS,RECEIVE_POSTBYID,DOWNVOTE_POST,UPVOTE_POST,RECEIVE_CATEGORIES } from '../actions'
const INITIAL_STATE = { posts: [], post: null ,categories:[]};


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
        return {  ...state }
      case DOWNVOTE_POST:
          // TODO : How do I get the data
          console.log ("Downvote : " + action.id  + action.voteScore);
          return {  ...state }
      case DELETE_POST:
        const postId = action.id
        let new_posts
        console.log ("ID : " + postId )
        // TODO : Why does the filter comparison returns true for everything
        new_posts = state.posts.filter(post => {post.id != postId; })
        console.log ("After Filter:" +   new_posts.length )
        return {
          ...state
       }
      case RECEIVE_POSTS:
        return { ...state, posts:action.data}
      case RECEIVE_POSTBYID:
          return { post: action.data }
      case RECEIVE_CATEGORIES:
        console.log ("RECEIVE_CATEGORIES:" + JSON.stringify(action.data.categories))
            // TODO : Need to understand if this is correct way to assign categories
          return {
            ...state,
            categories:[state.categories,action.data.categories]
          }

          // return {...state, categories: action.data.categories }

      default:
        return state
  }
}
