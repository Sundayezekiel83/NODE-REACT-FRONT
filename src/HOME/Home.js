import React, {useState, useEffect} from "react";
import Carousel from './Carousel'
import {getProducts} from './ApiHome';
import Card from './Card'
import Search from './Search'


const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
          
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data)
            if (data.error) {
                
                setError(data.error);
            } else {
                setProductsByArrival(data)
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <>
        <Carousel />
        <Search />
        
       <div>
            
            <h6 className="mt-3 text-danger">
                NEW ARRIVALS
                <hr/>
            </h6>
            <div className='container 
            '>
            <div className='row'>
                {productsByArrival.map((p, i)=>{
                    return <div className='mb-3 col-sm-9 col-md-4'>
                    <Card product={p} key={i}/>
                    
                        </div>
                })}
               </div>              
               </div>
            </div>

            <h6 className='mt-3 text-danger'>
                BEST SELLER
                <hr />
                    
          </h6>
                    <div className="container" >
                    <div className='row'>
                {productsBySell.map((p, i)=>{
                    return  <div className="mb-3 col-sm-6 col-md-4"><Card product={p} key={i}/> </div>
                })}

                
               </div>
               </div>

         
            </>
        
    );
};

export default Home;