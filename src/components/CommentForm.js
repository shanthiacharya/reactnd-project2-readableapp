import React ,{Component}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Post from './Post'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {editByCommentId } from '../actions'
import CaretUpIcon from 'react-icons/lib/fa/caret-up'
import CaretDownIcon from 'react-icons/lib/fa/caret-down'
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-left'
import TrashIcon from 'react-icons/lib/fa/trash'
import EditIcon from 'react-icons/lib/fa/pencil-square'

class CommentForm extends Component {

 constructor (props) {
   super (props)
     this.state ={
      comment_body: '',
       isEditing: false
     }
 }


 static PropTypes = {
   comment: PropTypes.object.isRequired

 }

 // handleCommentSubmit =(event) => {
 //   event.preventDefault()
 //   // var today = new Date()
 //   let today = new Date ()
 //   const timestamp =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
 //   const commentid = this.props.comment.commentId
 //   var newcomment = {
 //       id: commentid,
 //       parentId:this.props.comment.postId,
 //       timestamp: timestamp,
 //       body: this.comment_body.value,
 //       author: this.props.comment.comment_owner,
 //       voteScore: this.props.comment.voteScore,
 //       deleted: this.props.comment.deleted,
 //       parentDeleted: this.props.comment.parentDeleted
 //     }
 //     console.log ("commentid: " + commentid)
 //     this.props.itemEditComment(commentid,newcomment)
 //
 // }



  render() {
     const {comment,itemEditComment} = this.props

     if (this.state.isEditing) {
       return (
          <div className='post'>
           <form className="commentform" onSubmit={e => {
             e.preventDefault()

             let today = new Date ()
             const timestamp =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
             const commentid = comment.id
              console.log ("commentid: " + commentid)
             var newcomment = {
                 id: commentid,
                 parentId:comment.postId,
                 timestamp: timestamp,
                 body: this.comment_body.value,
                 author: comment.comment_owner,
                 voteScore: comment.voteScore,
                 deleted: comment.deleted,
                 parentDeleted: comment.parentDeleted
               }
              itemEditComment(commentid,newcomment)
              this.setState({isEditing:false})

          }}>
               <textarea defaultValue= {comment.body}  height="100" type="text" ref={(input) => this.comment_body = input} />
                 <br/>
               <button className="createpostbutton" type="submit">Save </button>
               <button>Cancel </button>
               <br/>
               <br/>
               <br/>
         </form>
         </div>
       )
     }

     return (
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
                    <button className="icon-btn"> <TrashIcon size={20}/> </button>
                    <button className="icon-btn" onClick ={() => this.setState({isEditing:true})}> <EditIcon size={20}/> </button>
              </div>
           </div>

     )

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
     itemEditComment: (commentid,newcomment) => dispatch(editByCommentId(commentid,newcomment)),
  }

}

export default (connect(
  null,
  mapDispatchToProps
) (CommentForm))
