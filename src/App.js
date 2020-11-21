import React from 'react'

import {Switch, Route} from 'react-router-dom'
import SignIn from './Users/SignIn'
import SignUp from './Users/SignUp'
import Home from './HOME/Home'
import Nav from './HOME/Nav'
import UserDashboard from './Users/UserDashboard'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './Users/AdminDashboard'
import AddCategory from './Admin/AddCategory';
import AddProduct from './Admin/AddProduct'
import './index.css';
import Shop from './HOME/Shop'
import detailedProduct from './HOME/detailedProduct'
import Footer from './HOME/Footer'
import Cart from './HOME/Cart'
import './App.css'
import NavBar from './HOME/NavBar/NavBar'
import Orders from './Admin/Orders'
import Profile from './Users/Profile'
import ManageProduct from './Users/ManageProduct'
import ProductUpdate from './Users/UpdateProduct'

function App(){
  return(
    
    <>
           
  {/* <Nav /> */}
  <NavBar />
  

    <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/shop' exact component={Shop} />
    <Route path="/signin"  exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />

    <PrivateRoute path="/profile/:userId" exact component={Profile} />

    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

    <AdminRoute path="/create/categories" exact component={AddCategory} />
    
    <AdminRoute path="/admin/products" exact component={ManageProduct} />
    
    <AdminRoute path="/create/products" exact component={AddProduct} />

    <AdminRoute path="/admin/orders" exact component={Orders} />

    <Route path="/product/:productId" component={detailedProduct} />

    <AdminRoute path="/admin/product/update/:productId" component={ProductUpdate} />

    <Route path='/carts' component={Cart} />
    
    </Switch>
    
    
    
   </>
   
  )
}

export default App