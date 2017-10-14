import React ,{Component}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import CaretUpIcon from 'react-icons/lib/fa/caret-up'
import CaretDownIcon from 'react-icons/lib/fa/caret-down'
import {fetchCommentByPostId,deleteByPostId,upVoteByPostId,downVoteByPostId } from '../actions'


class Post extends Component {



    componentDidMount() {
        // TODO : How do I wait until the results come back successfully, there is a delay
       this.props.itemsfetchComments(this.props.post.id);
   }
    handleClickDeletePost(id) {
       this.props.itemdeletePost(this.props.post.id);
    }
    handleClickUpvotePost(id,voteScore) {
       this.props.itemupVotePost(id,voteScore);
    }
    handleClickDownVotePost(id,voteScore) {
        this.props.itemdownVotePost(id,voteScore);
    }

    render() {
      const {post,comments} = this.props
      if (comments) console.log( comments.length)
       let today = new Date (post.timestamp)
       const timestamp =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


      return (

         <li className= "post_listitem" key={post.id}>
         <div className='post'>
            <div className ='votes'>
               <button className="icon-btn"  onClick={() => this.handleClickUpvotePost(post.id,post.voteScore)}>  <CaretUpIcon size={25}/> </button>
                <span className="score" > {post.voteScore}</span>
                <button className="icon-btn"  onClick={() => this.handleClickDownVotePost(post.id,post.voteScore)}> <CaretDownIcon size={25}/> </button>
             </div>
            <div className ='postdetails'>
               <Link to= {"/:" + post.id}  className ='title'> {post.title}</Link>
                <p className="subtitle"> {post.body} </p>
                  <p className='tagline'>Submitted by -{post.author} at {timestamp } </p>
                  <Link to= "/" > 2 comments </Link>
                  <Link to={"category/:" + post.category} className='button_meta'> {post.category} </Link>
                  <button className="icon-btn" onClick={() => this.handleClickDeletePost(post.id)}> Delete </button>
            </div>
         </div>


         </li>
       )}


}

Post.PropTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired
}

function mapStatetoProps (state){

   return {
      comments: state.comments.comments

   }

 }

 const mapDispatchToProps = (dispatch) => {
   return {
     itemsfetchComments: (id) => dispatch(fetchCommentByPostId(id)),
     itemdeletePost: (id) => dispatch(deleteByPostId(id)),
     itemupVotePost: (id,voteScore) => dispatch(upVoteByPostId(id,voteScore)),
     itemdownVotePost: (id,voteScore) => dispatch(downVoteByPostId(id,voteScore))

   }

 }


export default connect (mapStatetoProps,mapDispatchToProps)(Post)
