import React,{useState} from 'react'
import logo from '../../Asset/logo.png'
import img from '../../Asset/image1.png'
import {Link} from 'react-router-dom'
import {itemTotal} from '../cartAPi'
import './NavBar.css'
import { FaBars, FaTimes, FaShoppingCart} from 'react-icons/fa';
import { isAunthenticated, signout} from '../../auth/auth'
import {withRouter} from 'react-router-dom'
const NavBar = (props) => {

    const [click, setClick] = useState(false)

    const handleToggle = () =>{
        setClick(!click)
    }

    const CloseToggle = () =>{
        setClick(false)
    }
 
    return (

        <div className='header'>
        <div className='container'>
        <div className='navbars'>

            <div className="navbars-logo">
            <img src={logo} style={{width: '100px'}} />
            </div>

            <nav className='navbars-item' >
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <Link onClick={CloseToggle} className='nav-links' to="/">Home</Link>
                    </li>

                  

                    <li>
                        <Link onClick={CloseToggle} className='nav-links' to="/shop" >Product</Link>
                    </li>

                        {isAunthenticated() && isAunthenticated().user.role === 1 &&(
                                <li>
                                <Link onClick={CloseToggle} className='nav-links' to="/admin/dashboard" >DashBoard</Link>
                            </li>

                        ) }
                    
                    {isAunthenticated() && isAunthenticated().user.role === 0 && (
                             <li>
                             <Link onClick={CloseToggle} className='nav-links' to="/user/dashboard" >DashBoard</Link>
                         </li>
                    )}

                    {!isAunthenticated() &&(
                                <>
                                <li>
                                <Link onClick={CloseToggle} className='nav-links' to="/signup" >SignUp</Link>
                                </li>

                                    <li>
                                    <Link onClick={CloseToggle} className='nav-links' to="/signin">Login</Link>
                                    </li>
                                    </>
                    )}

                    {isAunthenticated() && (
                                    <li onClick={CloseToggle}>
                                    <Link  onClick={ ()=>signout(()=>{ 
  
                                    props.history.push('/')})}  className='nav-links'>
                                            Signout
                                    </Link>
                                    </li>
                                    
                    )}        

                                    <li>
                                    <Link onClick={CloseToggle} className='nav-links' to="/carts" ><FaShoppingCart style={{fontSize: '30px'}} />
                                <sup><strong className='text-info rounded' style={{textDecoration: 'none'}}>{" "}<em>{itemTotal()}</em></strong></sup>
                                    </Link>
                                    </li>
                                                        
                   
                </ul>
                    </nav>

         <div className='menu-icons' onClick={handleToggle}>{click ? <FaTimes style={{color: 'white', fontSize: '30px'}} /> : <FaBars style={{color: 'white', fontSize: '30px'}} />}</div>  
                                    
                </div>
                </div>
        </div>
    )
}

export default withRouter(NavBar)
