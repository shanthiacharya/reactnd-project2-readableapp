import React, { Component ,PureComponent} from 'react';
import PropTypes from 'prop-types'
// import logo from '../logo.svg';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import '../App.css';
// import * as ReadableAPI from '../utils/api'
// import {Route} from 'react-router-dom'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {withRouter} from 'react-router-dom'
import ListPosts from '../components/ListPosts'
import CreatePost from '../components/CreatePost'
import {fetchAllPosts,fetchAllCategories } from '../actions'
import PostDetails from '../components/PostDetails'
import PostCategory from '../components/PostCategory'
import HomeIcon from 'react-icons/lib/fa/home'
import MainNavigation from './MainNavigation'



class App extends PureComponent {

    componentDidMount() {
      this.props.getCategories();
    }

    static PropTypes = {
      categories: PropTypes.array.isRequired
    }

  render() {

    const {categories} = this.props
    return (

          <div className="App">

          <MainNavigation/>
          <Route exact path ="/" render = {()=> (
              <div>

               <CreatePost />
                <ListPosts />
              </div >
          )}/>
          <Route exact path ='/:category' render ={() => (

             <PostCategory/>

          )
          } />

          <Route exact path ="/:category/:id" component={PostDetails} />
          </div>


    );
  }
}



function mapStatetoProps (state){

   return {
     categories: state.categories.categories

   }

 }

 const mapDispatchToProps = (dispatch) => {
   return {
      getCategories: () => dispatch(fetchAllCategories()),
   }

 }


// export default connect (mapStatetoProps,mapDispatchToProps)(App);
export default withRouter (connect(mapStatetoProps,mapDispatchToProps)(App));
// export default App
