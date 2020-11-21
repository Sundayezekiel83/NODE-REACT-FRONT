
import React from 'react'
import './Services.css'

 const Services = () => {
    return (
        <div className="container-fluid mb-3">
        <div className='row'>
            <div className='bg-color col-sm-4 col-md-4'><i className='fa fa-fighter-jet text-light'/> {"  "} 
            <span className="h6 text-light text-center"> Quick Delivery</span><br /> 
             <p className='text-light'>We Deliver within 7 days</p></div>


             <div className='bg-color  col-sm-4 col-md-4'> {"  "}<i className='fa fa-comments text-light'/>
            <span className="h6 text-light text-center"> 24/7 support</span><br /> 
             <p className='text-light'>Support lines Available</p></div>

            <div className='bg-color col-sm-4 col-md-4'>{"  "}<i className='fa fa-credit-card-alt  text-light'/>

            <span className="h6 text-light text-center"> Secure Payment</span><br /> 
             <p className='text-light'>100% secure payment</p></div>

           

            {/* <div className='col-xl-8 col-sm-6 col-md-4 bg-color rounded align-items-center'>{"  "}<i className='fa fa-gift  text-light'/> 
            <span className="h6 text-light text-center"> Gift Service</span><br />  <p className='text-light'>
                
                Support gift Service</p>
                </div> */}
            
        </div>
        </div>
    )
}

export default Services
