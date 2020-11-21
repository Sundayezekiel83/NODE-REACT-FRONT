import queryString from 'query-string'

export const getProducts = sortBy => {
  return fetch(`${process.env.REACT_APP_API_URL}/products?sortBy=${sortBy}&order=desc&limit=6`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};



export const getCategories = () =>{
    return fetch (`${process.env.REACT_APP_API_URL}/categories`, {

            method: "GET"
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}

export const searchData = () =>{
            console.log('')
}

export const getFilteredProduct  = (skip, limit, filters = {}) =>{

  

    return fetch(`${process.env.REACT_APP_API_URL}/products/search/by`,{
        
     method: "POST",
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
         
     },
     body: JSON.stringify({skip, limit, filters})
 
 }).then(response => response.json()).catch(err => console.log(err))
    
}



export const list = params => {
  const  query = queryString.stringify(params)
    console.log('query:', query)
    return fetch(`${process.env.REACT_APP_API_URL}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };


  export const read = (productId) =>{
      return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`, {

          method: "GET"
      }).then(response =>{
          return response.json();
      }).catch(err => console.log(err));
  }



  export const listRelated = (productId) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/products/related/${productId}`, {

        method: "GET"
    }).then(response =>{
        return response.json();
    }).catch(err => console.log(err));
}


export const generateUserToken = (userId, token) =>{

    return fetch(`${process.env.REACT_APP_API_URL}/braintree/getToken/${userId}`,{
  
     method: "GET",
     headers: {
       Accept: 'application/json',
       "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
     }
    
  }).then(response => response.json()).catch(err => console.log(err))
    
  }

  export const processPayment = (userId, token, paymentData) =>{

    return fetch(`${process.env.REACT_APP_API_URL}/braintree/payment/${userId}`,{
  
     method: "POST",
     headers: {
       Accept: 'application/json',
       "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
     },
     body: JSON.stringify(paymentData)
    
  }).then(response => response.json()).catch(err => console.log(err))
    
  }