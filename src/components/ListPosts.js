import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Post from './Post'
import {withRouter} from 'react-router-dom'
import {fetchAllPosts } from '../actions'

class ListPosts extends Component{



 static PropTypes = {
   itemsfetchPosts: PropTypes.func.isRequired,
   posts: PropTypes.array.isRequired

 }

  componentDidMount() {
    this.props.itemsfetchPosts();
 }


  render() {

     const {posts} = this.props

     return (
       <div className ='content'>
        <div className='header'>
            <h3> Posts </h3>
        <div>

                <Link to= "/" > Date </Link>
                <Link to= "/" > Score </Link>
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

   return {
     posts: state.posts.posts,


   }

 }

 const mapDispatchToProps = (dispatch) => {
   return {
     itemsfetchPosts: () => dispatch(fetchAllPosts())
   }

 }




export default withRouter (connect (mapStatetoProps,mapDispatchToProps)(ListPosts));
