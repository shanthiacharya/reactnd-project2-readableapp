import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Post from './Post'
import {withRouter} from 'react-router-dom'
import {fetchAllPosts} from '../actions'
import {setSortOrder} from '../actions/sortOrder'
import sortBy from "../utils/sortBy";

class ListPosts extends Component{

 static PropTypes = {
   itemsfetchPosts: PropTypes.func.isRequired,
   posts: PropTypes.array.isRequired

 }

  componentDidMount() {
    this.props.itemsfetchPosts();
 }

 changeSorting = (order) =>  {
    console.log("Sort Order:" + order);
   this.props.setSortOrder(order)

 }

  render() {

     const {posts} = this.props

     return (
       <div className ='content'>
        <div className='header'>
            <h3> Posts </h3>
        <div>
                <label> sorty by: </label>
                <button onClick = {() => this.changeSorting("timestamp")}> Date </button>
                <button onClick = {() => this.changeSorting("voteScore")} >Score </button>
            </div>
        </div>
         <ul>
         {
            posts.map((post) => (
              <Post post={post ? post : null} key= {post.id} />
            ))
          }
       </ul>
       </div>
     )

  }

}

function mapStatetoProps (state){
    let sortOrder =  state.sortorder;
    let posts = state.posts.posts

    // posts.sort(sortBy('voteScore'))
   return {
     posts: sortBy(posts, sortOrder)
   }

 }

 const mapDispatchToProps = (dispatch) => {
   return {
     itemsfetchPosts: () => dispatch(fetchAllPosts()),
     setSortOrder: (order) => dispatch(setSortOrder(order))

   }

 }




export default withRouter (connect (mapStatetoProps,mapDispatchToProps)(ListPosts));
