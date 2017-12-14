import React ,{Component}from 'react'
import {Link} from 'react-router-dom'

class NotFoundPage extends Component {


  render () {

        return(

            <div className ='content'>
        				<h1>Page Not Found</h1>
        				<p>Sorry, there is nothing to see here.</p>
        				<p> <Link to= "/" >Back to Home</Link></p>
    			 </div>


        )
    }




}
export default NotFoundPage
