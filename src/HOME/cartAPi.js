export const  AddItem = (item, next) =>{
        let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.push({
            ...item,
            count: 1
        })

       cart = Array.from(new Set(cart.map(p => p._id))).map((id =>{
           return cart.find(p => p._id == id)
       }));

       localStorage.setItem("cart", JSON.stringify(cart));
       next()
            
    }

}

export const itemTotal = () =>{
    if(typeof window !== "undefined") {
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0;
}

export const showProductCart = () =>{
    if(typeof window !== "undefined"){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return [];
}

export const updateItem = (productId, count) =>{
    let cart = []
     if(typeof window !== "undefined"){
         if(localStorage.getItem('cart')){
            
            cart = JSON.parse(localStorage.getItem('cart'))

         }

         cart.map((p, i)=>{
             if(p._id === productId){
                 cart[i].count = count
             }
         })
         localStorage.setItem("cart", JSON.stringify(cart))
     }   

        

}

export const removeItem = (productId) =>{
    let cart = []
    if(typeof window !== "undefined"){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((p, i)=>{
            if(p._id===productId){
                cart.splice(i, 1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart
}

export const emptyCart = (next) =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem('cart')
        next()
    }
}


export const createOrder = (userId, token, createOrderData) =>{

    return fetch(`http://localhost:8000/api/order/create/${userId}`,{
  
     method: "POST",
     headers: {
       Accept: 'application/json',
       "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
     },
     body: JSON.stringify({order: createOrderData})
    
  }).then(response => response.json()).catch(err => console.log(err))
    
  }



  



