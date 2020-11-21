import React from 'react'

const ShowImage =({item, url})=>{
    
    return(
    <div>

        <img src={`http://localhost:8000/api/${url}/photo/${item._id}`}  alt={`${item.name}`}
            className='img-fluid rounded' style={{width: '200px', height: '200px'}}
                   />
    </div>
    )
}

export default ShowImage