import React ,{Component}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Post from './Post'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchPostbyId,fetchAllCommentByPosts,fetchCommentByPostId,addComment } from '../actions'
import CaretUpIcon from 'react-icons/lib/fa/caret-up'
import CaretDownIcon from 'react-icons/lib/fa/caret-down'
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-left'

class PostDetails extends Component {

    static PropTypes = {
      itemsfetchPostbyId: PropTypes.func.isRequired,
      post: PropTypes.object.isRequired,
      comments: PropTypes.array.isRequired,
      itemaddComment: PropTypes.func.isRequired
    }

    state = {
      comment_body: '',
      comment_owner:"sacharya",
      postId:null
    }


    componentDidMount() {
      this.postId = this.props.match.params.id
      this.postId = this.postId.replace(/:/ig,'')
      this.props.itemsfetchPostbyId(this.postId)
      this.props.itemsfetchComments(this.postId);
    }

    handleCommentSubmit =(event) => {
      event.preventDefault()
      // var today = new Date()
      let today = new Date ()
      const timestamp =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var obj = {
          id: 0,
          parentId:this.postId,
          timestamp: timestamp,
          body: this.comment_body.value,
          author: this.state.comment_owner,
          voteScore: 0,
          deleted: false,
          parentDeleted: false
        }
        this.props.itemaddComment(obj)

    }

    render() {
       const {post,comments,addComment} = this.props
      {console.log(this.props.post)}

        if (!this.props.post) {
            return (
                <h3>loading...</h3>
            );
        }

        return (
              <div>
                <div className="topnav">
                  <Link  className="icon-btn-back" to ="/"> <ArrowLeftIcon size={25}/> Back </Link>

                </div>
                <Post post={post ? post : null} key= {post.id} />
                <div className ='content'>
                  <div className='header'>
                        <h3> Comments </h3>
                  </div>
                  <form className="commentform" onSubmit= {(event) => this.handleCommentSubmit(event)}>
                    <label>Add comment </label>
                    <textarea  type="text" ref={(input) => this.comment_body = input} />
                      <br/>
                    <button className="createpostbutton" type="submit">Post</button>
                  </form>
                <ul>
                {
                  this.props.comments.map((comment) => (
                  <li className= "post_listitems" key={comment.id}>
                     <div className='post'>
                        <div className ='votes'>
                           <button className="icon-btn">  <CaretUpIcon size={25}/> </button>
                            <span className="score" > {comment.voteScore}</span>
                            <button className="icon-btn"> <CaretDownIcon size={25}/> </button>
                         </div>
                        <div className ='postdetails'>
                           <p  className ='title'> {comment.title}</p>
                            <p className="subtitle"> {comment.body} </p>
                              <p className='tagline'>Submitted by -{comment.author} at {comment.timestamp } </p>
                              <button className="icon-btn"> Delete </button>
                        </div>
                     </div>


                     </li>
                   ))
                 }
              </ul>
              </div>
              </div>
        );

     }


}



const mapStateToProps = (state) =>{

    return {
        post: state.posts.post,
        comments: state.comments.comments

    };
  // if (state.posts.post) {
  //   return {
  //       post: state.posts.post
  //   };
  // } else {
  //   return {};
  // }
  //
  // if (state.comments.comments) {
  //     return {
  //       comments: state.comments.comments
  //     }
  // } else {
  //   return {}
  // }

}
const mapDispatchToProps = (dispatch) => {
  return {
    itemsfetchPostbyId: (id) => dispatch(fetchPostbyId(id)),
    itemsfetchComments: (id) => dispatch(fetchCommentByPostId(id)),
    itemaddComment: (data) => dispatch(addComment(data)),
  }

}
export default withRouter (connect(
  mapStateToProps,
  mapDispatchToProps
) (PostDetails));
