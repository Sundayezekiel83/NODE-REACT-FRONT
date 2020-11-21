import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'
import {Slide} from 'react-reveal'
import{read, listRelated} from './ApiHome'
import Card from './Card'
import moment from 'moment'


const DetailedProduct = (props) =>{

    const [product, setProduct] = useState([])
    const [error, setError] = useState([])
    const [relatedProduct, setRelatedProduct] = useState([])


   

    const showQuantity = ()=>{
         
        return  product.quantity && (
        <p >{product.quantity}</p>
        )
      }

    useEffect(()=>{
     const   productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    const loadSingleProduct  = (productId) =>{

        read(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
                //set Related Product
                listRelated(data._id).then(response =>{
                    if(response.error){
                        setError(error)
                    }else{
                        setRelatedProduct(response)
                    }
                })
            }
        })
    }
    
    

    return(
        <>
       
            <Slide>

            <div className='row mt-3'>
                <div className=''> 
                
                {product && product.description && <Card product={product} 
                
                
                showDetails={true} showViewProductButton={false} showPrice={false} />}
                
                </div>

                <div className='col-9'>
                               <ul className='list-group '>  {product.name}
                               <li  className='list-group-item'>  {"\u20A6"} {product.price}</li>
                                 <li className='list-group-item'>Available quantity: {showQuantity()}</li>
                                
                                <li className='list-group-item'>Added: {moment(product.createdAt).fromNow()}</li>
                                <li className='list-group-item'>PRODUCT DETAILS</li>
                               
                                <li className='list-group-item'> {product.description}</li>

                                </ul>

                </div>
                
                  
                         
              </div>

                        <h2 className='text-center'>Related Products</h2>
           
              <div className='row'>
          
                   
                    {relatedProduct.map((product, i)=>{
                        
                        return  <div className='col'> <Card product={product} key={i}/>  </div>
                        
                    })}
                    </div>
                  
                    </Slide>
        </>
        
        
    )
}

export default DetailedProduct