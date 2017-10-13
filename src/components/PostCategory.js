import React ,{Component}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Post from './Post'
import {connect} from 'react-redux'
import {fetchPostbyId,fetchAllCommentByPosts } from '../actions'

class PostCategory extends Component {



    componentDidMount() {
        // console.log("Details ID: " + his.props.match.params.category);
        // let postcategory =this.props.match.params.category

    }

    render() {

      return (
        <div>
        <Link to ="/"> Back </Link>
        <h1> Post Category Page </h1>
        </div>
       )}


}



// function mapStateToProps(state) {
//   console.log(state)
//   return { post: state };
// }

export default PostCategory;
