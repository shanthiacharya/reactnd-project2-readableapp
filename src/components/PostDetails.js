import React ,{Component}from 'react'
import PropTypes from 'prop-types'

import Post from './Post'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchPostbyId,fetchCommentByPostId,creatNewComment } from '../actions'

import CommentForm from './CommentForm'
import uuid from 'uuid/v1'
import NotFoundPage from './NotFoundPage'


class PostDetails extends Component {

    static PropTypes = {
      itemsfetchPostbyId: PropTypes.func.isRequired,
      post: PropTypes.object.isRequired,
      comments: PropTypes.array.isRequired,
      itemaddComment: PropTypes.func.isRequired
    }

    state = {
      comment_body: '',
      comment_owner:'',
      postId:null,
      commentId:0,
      isEditing:false
    }


    componentDidMount() {
      this.postId = this.props.match.params.id
      this.postId = this.postId.replace(/:/ig,'')
      this.props.itemsfetchPostbyId(this.postId)
      this.props.itemsfetchComments(this.postId);
    }

    isEmpty = (obj) => {
       for(let key in obj) {
           if(obj.hasOwnProperty(key))
               return false;
       }
       return true;
     }


    handleCommentSubmit =(event) => {
      event.preventDefault()
      // var today = new Date()
      let today = new Date ()
      const timestamp =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      let parentId =this.props.match.params.id
      var obj = {
          id: uuid(),
          parentId:parentId,
          timestamp: timestamp,
          body: this.comment_body.value,
          author: this.comment_owner.value,
          voteScore: 0,
          deleted: false,
          parentDeleted: false
        }
        this.props.itemaddComment(obj,parentId)
        this.comment_body.value ="";
        this.comment_owner.value ="";
    }

    render() {

      const {post,comments} = this.props

        if (!post  || this.isEmpty(post)) {
           return (
               <NotFoundPage />
           );
       }
      else {
      return (
                <div>
                <Post post={post ? post : null} key= {post.id} />
                  <div className ='content'>

                      <div className='header'>
                            <h3> Comments </h3>
                      </div>
                      <form className="commentform" onSubmit= {(event) => this.handleCommentSubmit(event)}>
                        <label>Add comment </label>
                        <textarea  type="text" ref={(input) => this.comment_body = input} />
                        <br/>
                        <label>Author</label>
                        <input type="text"  ref={(input) => this.comment_owner = input}/>
                          <button className="createpostbutton" type="submit">Post</button>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                      </form>

                     { comments &&
                     <ul>
                      { this.props.comments.map((comment) => (
                         <CommentForm key ={comment.id} comment = {comment ? comment : null} />
                       ))
                     }
                   </ul>}

                  </div>

                </div>
           )
        }
     }
}



const mapStateToProps = (state) => {
    return {
        post: state.posts.post,
        comments: state.comments.comments
    }

}
const mapDispatchToProps = (dispatch) => {
  return {
    itemsfetchPostbyId: (id) => dispatch(fetchPostbyId(id)),
    itemsfetchComments: (id) => dispatch(fetchCommentByPostId(id)),
    itemaddComment: (data,parentId) => dispatch(creatNewComment(data,parentId)),
  }

}
export default withRouter (connect(
  mapStateToProps,
  mapDispatchToProps
) (PostDetails));
