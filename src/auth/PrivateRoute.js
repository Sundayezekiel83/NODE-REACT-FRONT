import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAunthenticated} from './auth'
 const PrivateRoute = ({component: Component, ...rest}) => {
    return (
       <Route {...rest} render = {props => isAunthenticated() && isAunthenticated().user.role===0 ? (
                <Component {...props} />

       ) :  <Redirect  to={{pathname: '/signin', state: {from: props.location}}}/> } />
    ) 
}

export default PrivateRoute