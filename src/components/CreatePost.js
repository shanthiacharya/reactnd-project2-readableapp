import React, {Component} from 'react'
import { connect } from 'react-redux'
// import { addPost } from '../actions'
import Modal from 'react-modal'
import {fetchAllCategories,creatNewPost} from '../actions'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'

class CreatePost extends Component {

  static PropTypes = {
    categories: PropTypes.array.isRequired
  }

  state = {
    id: uuid(),
    addPostModalOpen: false,
    post_title: '',
    post_description: '',
    post_category:'' ,
    post_author:''

  }

  componentDidMount(){
    this.props.getCategories();
  }

  getDefaultCategory =() => {
    if (this.props.categories.length) {
        return this.props.categories[0].name;
      }
      return null;

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

  render(){
     const {addPostModalOpen} = this.state
     const {addPostDetails } = this.props
    return(
       <div>
                <button className="createpostbutton"  onClick={() => this.openAddPostModal()} >
                               Submit Post
                             </button>
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
                                 id: uuid(),
                                 timestamp: timestamp,
                                 title: this.post_title.value,
                                 body: this.post_description.value,
                                 author: this.post_author.value,
                                 category: this.state.post_category,
                                 deleted: false,
                                 voteScore: 0
                               }

                            addPostDetails(obj)
                            this.closeAddPostModal()
                           }}>

                            <label>Title</label>
                            <input type="text" ref={(input) => this.post_title = input} />
                            <br/>
                            <label>Description </label>
                            <textarea type="text" ref={(input) => this.post_description = input} />
                              <br/>
                            <label>category</label>
                            <select value={this.post_category} onChange ={(event) => this.handleCategoryChange(event)}  >

                              {this.props.categories && this.props.categories.map(category =>
                                  <option key={category.name}  value={category.name}>{category.name}</option>
                              )}

                            </select>
                            <label>Author</label>
                            <input type="text" ref={(input) => this.post_author = input} />

                              <div className = 'modal-footer'>
                                <button onClick={this.closeAddPostModal}>Cancel</button>
                              <button type="submit" className="submitpostbutton">Add</button>
                              </div>
                            </form>

                    </Modal>
          </div>
      )
    }
}




function mapStateToProps ( state ) {


    return {
         categories: state.categories.categories

      }

}
function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchAllCategories()),
    addPostDetails: (post) => dispatch(creatNewPost(post))


  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (CreatePost);
