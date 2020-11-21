import React from 'react'

import {Link, withRouter} from 'react-router-dom'

const isActive = (history, path) =>{
    if(history.location.pathname === path){
        return{
            color: "#ff9900"
        }
    }else {
        return{color: 'white'}
    }
}

const Menu = ({history}) => {
    console.log(history)
    return(
        <div>
           <ul className="nav nav-tabs bg-dark">

               <li className="nav-item">
                <Link to='/' className="nav-link" style={isActive(history ,'/')}>Home</Link>
                </li>
                <li>
                 <Link to='/signin' className="nav-link" style={isActive(history, '/signin')}>SignIn</Link>
                </li>
                <li>
                 <Link to='/signup' className="nav-link" style={isActive(history, '/signup')}>SignUp</Link>   

               </li>
                              
               </ul> 
        </div>
    )
}


export default withRouter(Menu)