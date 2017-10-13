import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import logo from '../logo.svg';
// import { connect } from 'react-redux'
import '../App.css';
// import * as ReadableAPI from '../utils/api'
import {Route} from 'react-router-dom'
import ListPosts from '../components/ListPosts'
import CreatePost from '../components/CreatePost'
import {fetchAllPosts } from '../actions'
import PostDetails from '../components/PostDetails'
import PostCategory from '../components/PostCategory'



class App extends Component {

  //  constructor(props) {
  //   super(props);
  //   this.state = {
  //     posts :[]
  //   }
  //
  // }
  //
  // static PropTypes = {
  //   itemsfetchPosts: PropTypes.func.isRequired,
  //   posts: PropTypes.array.isRequired
  //
  // }
  //
  //  componentDidMount() {
  //    this.props.itemsfetchPosts();
  // }
  //
  // getPostById(id) {
  //   let posts
  //   if (this.state.posts){
  //       posts = this.state.posts.filter((post) => (post.id === id) )
  //       if (posts.length > 0){
  //         return posts[0]
  //       } else {
  //         return null
  //       }
  //     }
  //  }


  render() {

    // const {posts} = this.props
    // console.log (posts)
    return (

          <div className="App">
          <Route exact path ="/" render = {()=> (
              <div>
                 <div className="topnav">
                   <h3> React & Redux Readable App </h3>
                 </div>
                 <CreatePost />
                 <ListPosts />

              </div >
          )}/>
          <Route exact path ='/:category/:id' component={PostCategory} />
          <Route exact path ="/:id" component={PostDetails} />



          </div>

    );
  }
}



// function mapStatetoProps (state){
//
//    return {
//      posts: state.posts
//
//    }
//
//  }
//
//  const mapDispatchToProps = (dispatch) => {
//    return {
//      itemsfetchPosts: () => dispatch(fetchAllPosts())
//    }
//
//  }


// export default withRouter (connect (mapStatetoProps,mapDispatchToProps)(App));
export default App
