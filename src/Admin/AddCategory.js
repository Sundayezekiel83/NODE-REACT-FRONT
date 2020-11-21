
import React, {useState} from "react";
import {Slide, Fade} from 'react-reveal'
import {Link, Redirect} from 'react-router-dom'
import {signin,aunthenticate, isAunthenticated} from '../auth/auth'
import {addCategory} from './ApiAdmin'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
  MDBModalFooter,
  MDBIcon,
  MDBJumbotron
} from "mdbreact";

 const AddCategory = () =>{

  const [category, setCategory] = useState({
      
        name: "",
       error: false,
      success: false,
         
          })
          //destructure user and token localstorage

          const {user, token} = isAunthenticated()
          
          
        
            const {error, success, name} = category

    const handleChange = (e) =>{

      setCategory({...category, error:false, name: e.target.value, success: false})

    }


   const handleSubmitButton = (e)=>{
      
      e.preventDefault()
      setCategory({...category, error: false, success:false})
      
      addCategory(user._id, token,  {name}).then(data =>{
          if(data.error){
                return setCategory({
                    ...category, error: data.error, success: false
                })

          } else {
              setCategory({
                  ...category, error: false, success: true
              })
          }
      })
    
    }
    
    const FormPage = () => {
      return (
        <Slide right >
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6" style={{margin: 'auto', marginTop: '20px'}}>
              <MDBCard>
                <MDBCardBody>
                                 <form>
                    <div className="grey-text">
                      <MDBInput
                      onChange={handleChange}
                        label="NAME OF CATEGORY"
                        icon="envelope"
                        group
                        type="email"
                        value={name}
                        autoFocus
                      />
                     </div>

                  <div className="text-center mt-4">
                    <MDBBtn rounded
                    onClick={handleSubmitButton}
                       gradient="purple"
                      className="mb-3"
                      type="submit"
                      color="primary"
                    >
                      Create Category
                    </MDBBtn>
                  </div>
                  </form>
                   
                  </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        </Slide>
      );
    };

    const showError = () =>{
        return  <Slide up >
       <div className=" alert alert-danger text-center h6" style={{display: error ? '' : "none", width:'300px', margin: 'auto'}}>
                      {error} 
                      </div>
                     </Slide>
        }
    
    const showSuccess = ()=>{
        return  <Slide up >
        <div className=" alert alert-success text-center h6" style={{display: success ? '' : "none", width:'300px', margin: 'auto'}} >
                       {name} is Created successfully
                       </div>
                      </Slide>
    }
  

      
    return(
           <>

<MDBJumbotron>
    <h2 className="h1 display-4 text-center text-info">CREATE PRODUCT</h2>
           
           
          </MDBJumbotron>
                 {showSuccess()}
                 {showError()}
                   {FormPage()}

                 
               
                  </>

              
               
    )}

export default AddCategory
