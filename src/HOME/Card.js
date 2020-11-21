import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import { MDBBtn} from 'mdbreact';
import {Slide} from 'react-reveal'
import moment from 'moment'
import { AddItem, updateItem, removeItem} from './cartAPi';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Cards = ({product, showViewProductButton=true, showDetails=false, showPrice=true, showCart=true, 
  
  showUpdate=false,
  showRemove=false,
  setRun = f => f,
  run = undefined
}) => {

  const [redirect, setRedirect] = useState(false)


  const [count, setCount] = useState(product.count)
              

            const showRemoveButton = (showRemove)=>{
              if(showRemove){
                return(
                  <MDBBtn onClick={() => {
                    setRun(!run)
                    removeItem(product._id)}}>Remove</MDBBtn>
                )
              }
            }
   
            const showUpdateButton = (showUpdate) =>{
              if(showUpdate){
                return (
                  <>
                                    
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      
                      <span className='input-group-text'>Adjust</span>
                      
                      </div>
                    <input type='number' className='form-control' onChange={handleChange(product._id)} value={count} />
                  </div>
                  </>
                )
              }
            }

            const showCartButton = (showCart) =>{
              if(showCart){
                return(
                  <Link to='/carts'> <MDBBtn onClick={addToCart} size='sm'color='primary'>Cart</MDBBtn> </Link>
                )
              }
            }
            const handleChange = (productId) => event => {
                  setRun(!run)
              setCount(event.target.value < 1 ? 1 : event.target.value)
               if(event.target.value >= 1){
                 updateItem(productId, event.target.value)
               }
        
           }
         const showButton = (showViewProductButton) =>{

                      if(showViewProductButton){
                        return (

                          <Link to={`/product/${product._id}`}> <MDBBtn color='danger' size='sm'>View</MDBBtn> </Link>
                        )
                      }
         }
        
    

       
        const showInStock = () =>{
         if(product.quantity && product.quantity >= 1 ){
           return <span className='badge badge-pill badge-secondary'>inStock</span>
         }else{
           if(product.quantity == 0){
             return <span className='badge badge-pill badge-danger'>out of stock</span>
           }
         }
        }
          

          const addToCart = () =>{
            AddItem(product, ()=>{
            setRedirect(true)
            })
          }
      
            
         const shouldRedirect = (redirect) =>{
           if(redirect){
             return <Redirect to= '/carts' />
           }
         }

         const showPriceButton = (showPrice) =>{
          if(showPrice){
            return(
              <div>
                <span className='mr-3'>   {product.name} {product.price} </span>
              </div>
            )
          }
          } 
          
          const classes = useStyles();

  return (
    <>
    <Slide right>
 
    <div>
      <ShowImage item={product} url="products"/>
      {showPriceButton(showPrice)}
         {showInStock()}
        {shouldRedirect(redirect)}
        <div className='d-inline-flex mt-auto'>
           {showButton(showViewProductButton)}
            
       {showCartButton(showCart)}
       </div>
       
        {showUpdateButton(showUpdate)}

        {showRemoveButton(showRemove)}
        
       
        </div>
        </Slide>
        </>
        
  )
}

export default Cards;
