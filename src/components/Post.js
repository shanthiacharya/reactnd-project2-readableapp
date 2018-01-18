import React ,{Component}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import CaretUpIcon from 'react-icons/lib/fa/caret-up'
import CaretDownIcon from 'react-icons/lib/fa/caret-down'
import TrashIcon from 'react-icons/lib/fa/trash'
import EditIcon from 'react-icons/lib/fa/pencil-square'
import {fetchCommentByPostId,deleteByPostId,upVoteByPostId,downVoteByPostId,editByPostId,fetchAllCategories } from '../actions'
import Modal from 'react-modal'


class Post extends Component {



    componentDidMount() {
          this.props.getCategories();
    }

    static PropTypes = {
      categories: PropTypes.array.isRequired
    }

    state = {
      id: 0,
      addPostModalOpen: false,
      post_title: '',
      post_description: '',
      post_category:'' ,
      post_author:''
    }

    handleClickDeletePost(id) {
       this.props.itemdeletePost(this.props.post.id);
    }
    handleClickUpvotePost(id,voteScore) {
       this.props.itemupVotePost(id,voteScore+1);
    }
    handleClickDownVotePost(id,voteScore) {
        this.props.itemdownVotePost(id,voteScore-1);
    }

    openAddPostModal = ()=>{


         this.setState (() => (
           {
             addPostModalOpen: true,
           }))
    }

    closeAddPostModal = () => {
         this.setState (() => (
           {
             addPostModalOpen:false,
           }))
    }

    handleCategoryChange(event) {
      this.setState({post_category:event.target.value})
      
    }

    onChange = field => ev => this.setState({ post_title: ev.target.value });

    render() {

      const {post,editPostDetails} = this.props
      const {addPostModalOpen} = this.state
       let today = new Date (post.timestamp)
       const timestamp =  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


      return (

         <li className= "post_listitems" key={post.id}>
         <div className='post'>
                <div className ='votes'>
                   <button className="icon-btn"  onClick={() => this.handleClickUpvotePost(post.id,post.voteScore)}>  <CaretUpIcon size={25}/> </button>
                    <span className="score" > {post.voteScore}</span>
                    <button className="icon-btn"  onClick={() => this.handleClickDownVotePost(post.id,post.voteScore)}> <CaretDownIcon size={25}/> </button>
                 </div>
                <div className ='postdetails'>
                   <Link to= {"/" + post.category + "/" + post.id}  className ='title'> {post.title}</Link>
                    <p className="subtitle"> {post.body} </p>
                      <p className='tagline'>Submitted by -{post.author} at {timestamp } </p>
                       <Link to= {"/" + post.category + "/" + post.id} > {post.commentCount} comments </Link>
                       <Link to={"/" + post.category} className='button_meta'> {post.category} </Link>
                      <button className="icon-btn" onClick={() => this.handleClickDeletePost(post.id)}> <TrashIcon size={20}/> </button>
                      <button className="icon-btn" onClick = {() => this.openAddPostModal()}> <EditIcon size={20}/> </button>
                </div>

                <Modal
                        isOpen={addPostModalOpen}
                        closeTimeoutMS={0}
                        className ='modal'
                        overlayClassName='overlay'
                        contentLabel="Modal">
                        <h1>Submit Post</h1>
                        <span className="closebtn" onClick={this.closeAddPostModal}>&times;</span>
                          <form onSubmit={e => {
                            e.preventDefault()

                            var today = new Date()
                            let timestamp = today.getTime()

                            var obj = {
                                id: post.id,
                                timestamp: timestamp,
                                title: this.post_title.value,
                                body: this.post_description.value,
                                author: this.post_author.value,
                                category: this.state.post_category,
                                deleted: false,
                                voteScore: 0
                              }
                           editPostDetails(post.id,obj)
                           this.closeAddPostModal()
                          }}>

                           <label>Title</label>
                           <input type="text" ref={(input) => this.post_title = input}  defaultValue = {post.title}   onChange={this.onChange("title")}/>
                           <br/>
                           <label>Description </label>
                           <textarea type="text" ref={(input) => this.post_description = input} defaultValue = {post.body} />
                             <br/>
                           <label>category</label>
                           <select defaultValue={post.category} onChange ={(event) => this.handleCategoryChange(event)}  >

                             {this.props.categories && this.props.categories.map(category =>
                                 <option key={category.name}  value={category.name}>{category.name}</option>
                             )}

                           </select>
                           <label>Author</label>
                            <input type="text" ref={(input) => this.post_author = input} defaultValue = {post.author} />
                             <div className = 'modal-footer'>
                             <button onClick={this.closeAddPostModal}>Cancel</button>
                             <button type="submit" className="submitpostbutton">Add</button>

                             </div>
                           </form>

                   </Modal>
         </div>





         </li>
       )}


}

Post.PropTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array
}

function mapStatetoProps (state){

   return {
      comments: state.comments.comments,
      categories: state.categories.categories

   }

 }

 const mapDispatchToProps = (dispatch) => {
   return {
     itemsfetchComments: (id) => dispatch(fetchCommentByPostId(id)),
     getCategories: () => dispatch(fetchAllCategories()),
     itemdeletePost: (id) => dispatch(deleteByPostId(id)),
     itemupVotePost: (id,voteScore) => dispatch(upVoteByPostId(id,voteScore)),
     itemdownVotePost: (id,voteScore) => dispatch(downVoteByPostId(id,voteScore)),
     editPostDetails: (id,obj) => dispatch(editByPostId(id,obj))

   }

 }


export default withRouter (connect(mapStatetoProps,mapDispatchToProps)(Post));
