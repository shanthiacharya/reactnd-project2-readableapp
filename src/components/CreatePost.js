import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import Modal from 'react-modal'
import {fetchAllCategories} from '../actions'
import PropTypes from 'prop-types'

class CreatePost extends Component {

  constructor(props) {
    super(props);
     this.props.getCategories();
  }
  static PropTypes = {
    categories: PropTypes.array.isRequired
  }
  state = {
    addPostModalOpen: false,
    post_title: '',
    post_description: '',
    post_category: '',
    post_owner:'sacharya'

  }

  componentDidMount(){
      console.log(this.props.categories)

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



  render(){
     const {addPostModalOpen,post_category,post_owner} = this.state
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
                         overlayClassName='onerlay'
                         contentLabel="Modal">
                         <h1>Modal Content</h1>
                         <span className="closebtn" onClick={this.closeAddPostModal}>&times;</span>
                           <form onSubmit={e => {
                             e.preventDefault()

                             var today = new Date()
                             let timestamp = today.getTime()
                             var obj = {
                                 id: 0,
                                 timestamp: timestamp,
                                 title: this.post_title.value,
                                 body: this.post_description.value,
                                 author: post_owner,
                                 category: this.post_category,
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
                            <select value={this.state.value} >
                              <option value="react">Grapefruit</option>
                              <option value="redux">Lime</option>
                              <option value="Udacity">Coconut</option>
                              <option value="others">Mango</option>
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




function mapStateToProps ({ state }) {


  return {
       // TODO : Not sure how to get the categories from state.categories that got assigned in reducers
       categories: state
    }
}
function mapDispatchToProps (dispatch) {
  return {

    addPostDetails: (data) => dispatch(addPost(data)),
    getCategories: () => dispatch(fetchAllCategories())

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (CreatePost);
