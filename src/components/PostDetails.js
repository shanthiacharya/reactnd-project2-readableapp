import React ,{Component}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Post from './Post'
import {connect} from 'react-redux'

import {fetchPostbyId,fetchAllCommentByPosts } from '../actions'

class PostDetails extends Component {



    componentDidMount() {
      console.log("Detail Page" + this.props.match.params.id)
    }

    // static PropTypes = {
    //   post: PropTypes.object.isRequired
    // }

    render() {
      //  const {post} = this.props
      return (
        <div>
        <Link to ="/"> Back </Link>
        <h1> Details Go here : + {this.props.match.params.id}</h1>

        </div>
       )}


}



function mapStateToProps(state) {
  // console.log(state)
  return {

  };
}

// export default connect(mapStateToProps,{fetchPostbyId,fetchAllCommentByPosts})(PostDetails);
export default PostDetails
