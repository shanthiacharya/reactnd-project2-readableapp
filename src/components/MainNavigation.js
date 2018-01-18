import React ,{Component}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import '../App.css';
import {connect} from 'react-redux'
import {fetchAllCategories } from '../actions'
import HomeIcon from 'react-icons/lib/fa/home'


class MainNavigation extends Component {

  componentDidMount() {
    this.props.getCategories();
  }

  static PropTypes = {
    categories: PropTypes.array.isRequired
  }



    render() {
      const {categories} = this.props
      const categoryLinks = categories.map (category => (
        {
          ...category,
          path: `/${category.path}`
        }
      ))

      return (

        <div className="topnav">
            <Link  className="logolink" to ="/"> <HomeIcon size={25}/> React & Redux Readable App </Link>
              { categoryLinks.map((category) => (

               <Link className= "categorylinks" to={category.path} key = {category.path}> {category.name} </Link>
            ))
            }
          </div>

       )
     }


}


const mapStateToProps = (state) =>{

    return {
        categories: state.categories.categories
    };

}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchAllCategories()),
  }

}
export default withRouter (connect(
  mapStateToProps,
  mapDispatchToProps
) (MainNavigation));
