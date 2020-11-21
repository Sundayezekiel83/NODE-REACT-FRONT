import React, {useState, useEffect} from "react";

import {getCategories, list } from './ApiHome';
import Card from './Card';
const Search = () => {


    const [data, setData] =  useState({

        categories: [],
        category: [],
        search: "",
        results: [],
        searched: false,
        error: ''
    }
    )

    const {categories, category, search, results, searched, error} = data

    const searchData = ()=>{
        // console.log(category, search)
        if(search){
            list({search: search || undefined, category: category})
            .then(response=>{
                if(response.error){
                    console.log(response.error)
                }else{
                    setData({...data, results: response, searched: true})
                }
            })

            
        }
    }

    const showMessage =(searched, results) =>{
        if(searched && results.length >0){
            return( 
                       ` Found ${results.length} Products`
           )
        }else{
            if(searched && results.length < 1){
                return (
                       "No Product Found "
            )
            }
        }
    }

    const handleChange  = (name) =>  event => {
            setData({...data, [name]: event.target.value, searched: false})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        searchData()
    }
     const searchedProduct = (results = []) =>{

            return(    <div>

                <h2 className='text-center text-danger'>{showMessage(searched, results)} </h2>
               
               <div className="container">
                <div className='row'>
                            
              
               {results.map((product, i)=>{
                   return <Card product={product} key={i} />
               })}
           </div>
           </div>
           
                </div>
            
            )   
     }


    const form = () =>(
       <>
            
        <form onSubmit={handleSubmit} >
        <div className="input-group mb-3 mt-3">
            
  <div className="input-group-prepend">
      
    <span className="input-group-text">
      
        <select onChange={handleChange('category')}>
            
            <option value='all'>All</option>
            {categories.map((c, i)=>{
                return <option  value={c._id} key={c._id}>{c.name}</option>
            })}
        </select>
        
    </span>
    
  </div>
  <input onChange={handleChange('search')} type="text" type='search' className="form-control" placeholder='SEARCH'/>

  <div className="input-group-append">

    <span className="input-group-text" style={{cursor: 'pointer'}}>Go</span>
  </div>
</div>
</form>




       </>
      
    )

   
    

    const init = () =>{
        getCategories().then(data =>{
            if(data.error){
                setData({...data, error: data.error})
            }else{
                setData({...data, categories: data})
            }
        })
    }


    useEffect(() => {
      init()
    }, []);

     return (
        <>
        {form()}
        <div className='container-fluid mb-3'>
        {searchedProduct(results)}
        </div>
        

        </>
  );
}

export default Search