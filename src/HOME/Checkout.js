import React, {useState, useEffect}from 'react'
import {isAunthenticated} from '../auth/auth';
import {generateUserToken, processPayment} from '../HOME/ApiHome'
import DropIn from 'braintree-web-drop-in-react'
import { MDBBtn } from 'mdbreact'
import {Link} from 'react-router-dom'
import {createOrder, emptyCart} from './cartAPi'


const Checkout = ({product}) => {

        const [data, setData] = useState({
                
                success: false, 
                clientToken: null,
                error: '',
                instance: {},
                address: ''
        })

        

        const userId = isAunthenticated() && isAunthenticated().user._id
        const token = isAunthenticated() && isAunthenticated().token


                              useEffect(()=>{
                getToken(userId, token)
        }, [])

        const getToken = (userId, token) =>{
                
                generateUserToken(userId, token).then(data =>{
                        if(data.error){
                                setData({...data, error:data.error})
                        }else{
                                setData({clientToken: data.clientToken})
                        }
                })

        }

                const DeliveryAddress = data.address


                const buy = () =>{
                        //send the nounce to backed
                        //nounce is = data.instance.requestpaymentMethod()
                        
                        const getNounce = data.instance.requestPaymentMethod().then(data =>{
                                
                               // console.log(data)

                             let  nonce = data.nonce
                                //send nonce as payment method to the backend and total to be charged. 
                               // console.log('nonce:',  nonce, 'total:', getTotal(product) )
                                const paymentData = {
                                        paymentMethodNonce: nonce,
                                        amount: getTotal(product)
                                }

                                processPayment(userId, token, paymentData).then(responses=> {
                                        console.log(responses)
                                        
                                        //creating orders
                                        let createOrderData ={
                                          product: product,
                                          amount: responses.transaction.amount,
                                          transaction_id: responses.transaction_id,
                                          address: DeliveryAddress

                                        }
                                        createOrder(userId, token, createOrderData)

                                        //setting success to true
                                        setData({...data, success: true})
                                        //emptying the cart
                                        emptyCart(() =>{
                                                console.log('payment is successful and empty cart')
                                        })
                                        

                                 } )

                        }).catch(err =>{ 
                                
                                 console.log(err)
                                setData({...data, error: err.message})
                        
                        })
                        
                        
                }

                const handleAddress = (event) =>{
                
                        console.log('change')
                        setData({...data, address: event.target.value})

                }

                const showError = (error) =>{
                return <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
                }

                const showSuccess = (success) =>{
                        return <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
                                
                                Your Transaction was successful{success}</div>
                        }

        const showDropIn = () =>{

                return( 
                
                <div onBlur={()=> setData({...data, error: ""})}>
                {data.clientToken !== null && product.length > 0 ?(
                        <>
                        <div className='form-group mb-3'>
                                <label className='text-muted'>Delivery Address: </label>
                                <textarea  onChange={handleAddress} placeholder='Type your Address'
                                className='form-control'
                                value={data.address}/>

                        
                        <DropIn options={{
                                authorization: data.clientToken
                        }} onInstance={instance=>(data.instance = instance)}/>
                                     <button  onClick={buy} className='btn btn-info btn-lg'>PAY</button>
                                     </div>
                         </>
                ): null}
                </div>
                
                
                )}
                
    const getTotal = () =>{

            return product.reduce((currentvalue, acc)=>{

                    return currentvalue + acc.count * acc.price
            }, 0)

    }

    const showCheckOut = () =>{
           return isAunthenticated() ? (
                  <div> {showDropIn()} </div>
           ): (
                     <Link to='/signin'>   <button className='btn btn-secondary'>Signin to Checkout</button> </Link>
           )
    }
    return (
        <div>
                
                {showSuccess(data.success)}
                {showError(data.error)}
                <h2>TOTAL: {getTotal()} </h2>
                {showCheckOut()}
                
                
        </div>
    )
}

export default Checkout
