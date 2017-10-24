import React ,{Component}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Post from './Post'
import {connect} from 'react-redux'
import {fetchPostbyId,fetchAllCommentByPosts,fetchPostbyCategory } from '../actions'
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-left'

class PostCategory extends Component {

      static PropTypes = {
        itemsfetchPostbyCategory: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired,

      }

      state = {
        postCategory:null
      }

    componentDidMount() {
        console.log("Details category : " + this.props.match.params.category);
        this.postCategory = this.props.match.params.category
        this.postCategory = this.postCategory.replace(/:/ig,'')
        this.props.itemsfetchPostbyCategory(this.postCategory)

    }

    render() {
        const {posts} = this.props
      return (
        <div>
        <div className="topnav">
          <Link  className="icon-btn-back" to ="/"> <ArrowLeftIcon size={25}/> Back </Link>
        </div>

        <ul>
        {
           posts.map((post) => (
             <Post post={post ? post : null} key= {post.id} />
           ))
         }
      </ul>
        </div>
       )}


}


const mapStateToProps = (state) =>{

    return {
        posts: state.posts.posts,
    };

}

const mapDispatchToProps = (dispatch) => {
  return {
    itemsfetchPostbyCategory: (category) => dispatch(fetchPostbyCategory(category)),
  }

}
export default connect(
  mapStateToProps,
  mapDispatchToProps
) (PostCategory);
