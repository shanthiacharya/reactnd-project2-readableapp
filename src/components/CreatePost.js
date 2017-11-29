import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import Modal from 'react-modal'
import {fetchAllCategories} from '../actions'
import PropTypes from 'prop-types'

class CreatePost extends Component {

  // constructor(props) {
  //   super(props);
  //
  // }
  static PropTypes = {
    categories: PropTypes.array.isRequired
  }

  state = {
    id: 0,
    addPostModalOpen: false,
    post_title: '',
    post_description: '',
    post_category:'react' ,
    post_owner:'sacharya'

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
   this.state.post_category = event.target.value;
 }

  render(){
     const {addPostModalOpen,post_category,post_owner,id} = this.state
     const {addPostDetails,categories } = this.props
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
                         <h1>Modal Content</h1>
                         <span className="closebtn" onClick={this.closeAddPostModal}>&times;</span>
                           <form onSubmit={e => {
                             e.preventDefault()

                             var today = new Date()
                             let timestamp = today.getTime()
                             var obj = {
                                 id: this.state.id++,
                                 timestamp: timestamp,
                                 title: this.post_title.value,
                                 body: this.post_description.value,
                                 author: post_owner,
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
                              <div className = 'modal-footer'>
                              <button type="submit" className="submitpostbutton">Add</button>
                              <button onClick={this.closeAddPostModal}>Cancel</button>
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
    addPostDetails: (data) => dispatch(addPost(data))


  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (CreatePost);
