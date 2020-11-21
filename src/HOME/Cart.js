
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {showProductCart} from './cartAPi';
import Card from './Card'
import Checkout from './Checkout';

import {isAunthenticated} from '../auth/auth'


 const Cart = (props) => {
     const [items, setItems] = useState([])
     const [run, setRun] = useState([])

     useEffect(() => {

         setItems(showProductCart())

     }, [run])

     const showItems = (items) =>{
         return(

            
             <div>
                 <h2>Your Cart has {`${items.length}`} items </h2>
                
                <hr />
                {items.map((product, i )=>{
                    return <Card run={run} setRun={setRun} product={product} key={i} showCart={false} showUpdate={true} showRemove={true}/>
                })}
                 
             </div>
             
          
         )
     }

     const noItemMessage = () =>{
         return(
             <div>
                 <h2>Your cart is empty. <br/> <Link to='/shop'>Go to Products </Link></h2>
             </div>
         )
     }

    return (
        <>
        <div className='row mt-3'>
            <div className='col col-6'>
                {items.length >= 1 ? showItems(items) : noItemMessage()}
            </div>


            <div className='col col-6'>
             
                <h2>YOUR CART SUMMARY</h2>
                <hr />
                
               <h3><Checkout product={items} /></h3>

              
            </div>
        </div>
        </>
    )
}

export default Cart; 
