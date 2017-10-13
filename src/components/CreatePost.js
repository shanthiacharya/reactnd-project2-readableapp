import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import Modal from 'react-modal'

class CreatePost extends Component {
  state = {
    addPostModalOpen: false,

    post_title: '',
    post_description: '',
    post_category: '',
    post_owner:'sacharya'

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
     const {  addPostDetails } = this.props
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
                         <span className="closebtn">&times;</span>
                           <form onSubmit={e => {
                             e.preventDefault()

                            //  let title = this.post_title.value
                            //  let body = this.post_description.value
                              var today = new Date()
                             let timestamp = today.getTime() //today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
                              <option value="grapefruit">Grapefruit</option>
                              <option value="lime">Lime</option>
                              <option value="coconut">Coconut</option>
                              <option value="mango">Mango</option>
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
       posts: state
    }
}
function mapDispatchToProps (dispatch) {
  return {

    addPostDetails: (data) => dispatch(addPost(data)),

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (CreatePost);
