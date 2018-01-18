import React ,{Component}from 'react'
import PropTypes from 'prop-types'

import Post from './Post'
import {connect} from 'react-redux'
import {fetchPostbyCategory } from '../actions'

import {withRouter} from 'react-router-dom'

class PostCategory extends Component {

      static PropTypes = {
        itemsfetchPostbyCategory: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired,

      }

      state = {
        postCategory:null
      }

    fetchCategoryPosts(category){
       this.props.itemsfetchPostbyCategory(category)
    }

    componentWillReceiveProps (newProps) {
      let newPropsCategory = newProps.match.params.category
        if ( newPropsCategory !== this.postCategory ) {
            this.fetchCategoryPosts(newPropsCategory)
            this.postCategory = newPropsCategory
        }
    }

    componentDidMount() {

        this.postCategory = this.props.match.params.category
        this.fetchCategoryPosts(this.postCategory)

    }

    render() {
        const {posts} = this.props
      return (
        <div>


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
export default withRouter (connect(
  mapStateToProps,
  mapDispatchToProps
) (PostCategory));
