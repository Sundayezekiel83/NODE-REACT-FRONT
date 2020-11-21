import { withRouter } from "react-router-dom"
import {API} from '../config';

export const signup = (user) =>{

    return fetch(`http://localhost:8000/api/signup`,{
 
     method: "POST",
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(user)
 
 }).then(response => response.json()).catch(err => console.log(err))
    
 }



 export const signin = (user) =>{

    return fetch('http://localhost:8000/api/signin',{
 
     method: "POST",
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(user)
 
 }).then(response => response.json()).catch(err => console.log(err))
    
 }

 export const aunthenticate = (users, next) =>{
   if(typeof window !== 'undefined'){
     localStorage.setItem('jwt', JSON.stringify(users))
     next()
   }
 }

 export const signout = (next) =>{
   if(typeof window !== 'undefined'){
     localStorage.removeItem('jwt')
     next()
      return fetch('http://localhost:8000/api/signout', {
        method: "GET",
      }).then(res => console.log(res))
      .catch(err => console.log(err))
   }
 }

export const isAunthenticated = ()=>{

          if(typeof window =='undefined'){
            return false
          }
          if(localStorage.getItem('jwt')){
            return JSON.parse(localStorage.getItem('jwt'))
          }else {
            return false;
          }
}