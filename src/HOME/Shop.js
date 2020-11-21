
import React, {useState, useEffect} from 'react'
import { MDBRow, MDBCol } from 'mdbreact'
import {getCategories, getFilteredProduct} from './ApiHome';
import CheckBox from './CheckBox';
import {Prices} from './FixedPrice'
import Radio from './Radio';
import Card from './Card'

const Shop = ()=>{


    const [myfilters, setMYFilters]= useState({
        filters: {category: [], price: []}
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [filteredResult, setFilteredResult] = useState([])
    const [size, setSize] = useState(0)

    const init = () =>{
        getCategories().then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data)
            }
        })
    }

    
    const loadFilteredResult = (newfilters)=>{
        
       getFilteredProduct(skip, limit, newfilters).then(data=> {
         if(data.error){
            setError(data.error)
         }else{
             setFilteredResult(data.data)
             setSize(data.size)
             setSkip(0)
         }
       })
    }

    
    const loadMore = ()=>{

        let toSkip = skip + limit
        
        getFilteredProduct(toSkip, limit, myfilters.filters).then(data=> {
          if(data.error){
             setError(data.error)
          }else{
              setFilteredResult([...filteredResult, ...data.data])
              setSize(data.size)
              setSkip(toSkip)
          }
        })
     }

   const loadMoreButton = () =>{
       return (
           size > 0 && size >=limit && (
               <button onClick={loadMore} className='btn btn-warning mb-5'>Load More</button>
           )
       )
   }
 

useEffect(()=>{
    init();
    loadFilteredResult(myfilters.filters)
},[])



    const handleFilters = (filters, filterBy) =>{
            
        const   myNewFilter = {...myfilters}
        

           myNewFilter.filters[filterBy] = filters

           

           if(filterBy === 'price'){

                const priceValues = handlePrice(filters)

                myNewFilter.filters[filterBy] = priceValues;


           }
           loadFilteredResult(myfilters.filters)

           setMYFilters(myNewFilter)
}

    const  handlePrice = value =>{

                const data = Prices
                let array = []

                for(let key in data){
                    if(data[key]._id === parseInt(value)){
                        
                        array = data[key].array
                    }
                }
                    return array;
        }

    return(
        <>
                
           <div className='row'>

              <div className="text-info col-3 ml-2 mt-3"  >
                  <h6>Select Your Category</h6>
                  <ul>
                <CheckBox categories={categories}  handleFilters = {(filters)=>handleFilters(filters, "category")}/>
                
                </ul>
                <h6>Select By Prices</h6>
                <ul>
                <Radio  prices={Prices} handleFilters = {(filters)=>handleFilters(filters, "price")} />
                </ul>   

             </div>

                    <div className='col'>
                    <div className="row">
                {filteredResult.map((filteredProd, i)=>{
                        return(
                        <div key={i} className="col-9 col-xs-6 col-sm-4 col-md-4 mb-3 mt-3">
                                <Card product={filteredProd} />
                            </div>

                )})}
                 </div>
                        </div>

                        </div>
                        <div className='text-center'>
                        {loadMoreButton()}
                        </div>                            
                         
          </>

    )
}

export default Shop