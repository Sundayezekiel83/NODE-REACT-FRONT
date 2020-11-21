import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBContainer,
MDBHamburgerToggler, 
MDBIcon} from 'mdbreact';
import { signout, isAunthenticated} from '../auth/auth';
import {itemTotal} from './cartAPi'

class NavbarPage extends Component {
state = {
  collapse1: false,
  collapseID: ''
}
   
  
toggleCollapse = collapseID => () => {
  this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
}

toggleSingleCollapse = collapseId => {
  this.setState({
    ...this.state,
    [collapseId]: !this.state[collapseId]
  });
}



render() {
  return (
         <MDBNavbar style={{ marginTop: '0px'}}  sticky='top' >
          <MDBContainer>
            <MDBNavbarBrand>
              
            </MDBNavbarBrand>
            <MDBHamburgerToggler  id="hamburger1" onClick={()=> this.toggleSingleCollapse('collapse1')} />
              <MDBCollapse isOpen={this.state.collapse1} navbar>
                <MDBNavbarNav right>
                  <MDBNavItem active>

          <MDBNavLink style={{color: 'white'}} to="/"> <MDBIcon icon="home" /> {"    "}  Home Page</MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem active>

          <MDBNavLink style={{color: 'white'}} to="/shop"> <MDBIcon icon="shopping-basket" /> {"    "}  Shop</MDBNavLink>
                   </MDBNavItem>
                  {isAunthenticated() && isAunthenticated().user.role===0 &&(
                          <MDBNavItem>
                          <MDBNavLink style={{color: 'white'}} to="/user/dashboard"> <MDBIcon icon="user-secret" /> {"    "} DashBoard</MDBNavLink>
                          </MDBNavItem>
                  )}
                  {isAunthenticated() && isAunthenticated().user.role===1 && (
                             <MDBNavItem>
                             <MDBNavLink style={{color: 'white'}} to="/admin/dashboard"> <MDBIcon icon="user-secret" /> {"    "} DashBoard</MDBNavLink>
                             </MDBNavItem>
                     
                    
                  )}
                  

                    {!isAunthenticated() && (
                          <>
                      <MDBNavItem>
                    <MDBNavLink style={{color: 'white'}} to="/signup"><MDBIcon icon="user-plus" /> {"    "} SignUp</MDBNavLink>
                  </MDBNavItem>
                     <MDBNavItem>
                     <MDBNavLink style={{color: 'white'}} to='/signin'> <MDBIcon icon="sign-in-alt" /> {"    "}Login</MDBNavLink>
                       </MDBNavItem>
                            </>           
                    )}
                        {isAunthenticated() && (

                            <MDBNavItem>
                      <MDBNavLink to="" style={{color: 'white', cursor: "pointer", fontsize: "100px"}} className="mr-2" onClick={()=>signout(()=>{ 
  
                      this.props.history.push('/')})}>  <MDBIcon icon="sign-out-alt" /> {"    "} Sign-Out</MDBNavLink>

                            </MDBNavItem>
    

                        )}
                
                <MDBNavItem active>

                      <MDBNavLink style={{color: 'white'}} to="/carts"> <MDBIcon icon="shopping-basket" /> {" "} Cart <sup><strong className='text-warning bg-dark rounded'><em>{itemTotal()}</em></strong></sup></MDBNavLink>
                 </MDBNavItem>
                </MDBNavbarNav>

              </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      
      
    );
  }
}

export default withRouter(NavbarPage);