import React, {useState} from "react";
import {Slide} from 'react-reveal'
import {Link} from 'react-router-dom'
import {signup} from '../auth/auth'

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
  MDBModalFooter
} from "mdbreact";

 const SignUp = () =>{

  const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      success: false
          })
        
       const {name, email, password, error, success, confirmPassword} = values   

    const handleChange = name => event =>{

      setValues({...values, error:false, [name]: event.target.value})

    }


   const handleSubmitButton = (e)=>{
            e.preventDefault()

      if(password && confirmPassword && confirmPassword !== password){
        setValues({
          ...values, 
          error: "Password doesn't Match",
          password: '',
          confirmPassword: ''

        })
       
      }else{
      
      signup({name:name, email:email, password:password}).then(responses => {

        if(responses.error) {
          return setValues({
           ...values,  error: responses.error, success: false 
          })
        }else{
          setValues({
            ...values, 
            name: '',
            email: '',
            password: '',
            errors: '',
            success: true,
                      })
        }
      })
    }}
    
    const FormPage = () => {
      return (
        <Slide down >
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6" style={{margin: 'auto', marginTop: '20px'}}>
              <MDBCard>
                <MDBCardBody>
                  <MDBCardHeader className="form-header" style={{color: '#1c2237'}}>
                    <h3 className="my-3 text-center text-info h4">
                       SIGNUP FORM
                    </h3>
                  </MDBCardHeader>
                  <form>
                    <div className="grey-text">
                      <MDBInput
                      onChange={handleChange('name')}
                        label="Type your name"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={name}
                      />
                      <MDBInput
                      onChange={handleChange('email')}
                        label="Type your email"
                        icon="envelope"
                        group
                        type="email"
                        value={email}
                      />
                      <MDBInput
                      onChange={handleChange('password')}
                        label="Enter your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        value={password}
                      />

                      <MDBInput
                      onChange={handleChange('confirmPassword')}
                        label="Confirm Password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        value={confirmPassword}
                      />    
                     
                    </div>
    
                  <div className="text-center mt-4">
                    <MDBBtn rounded
                    onClick={handleSubmitButton}
                     
                      className="mb-3"
                      type="submit"
                      color="primary"
                    >
                     SIGNUP
                    </MDBBtn>
                  </div>
                  </form>
                  <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Already a Member <Link to='/signin'>Login Here</Link></p>
                  
                </div>
              </MDBModalFooter>
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
     <div className=" alert alert-danger text-center h6 mt-3" style={{display: error ? '' : "none", width: '300px', margin: 'auto'}}>
                    {error}
                    </div>
                   </Slide>
      }

      const showSuccess = () =>{
         return <Slide down ><div className=" alert alert-info text-center mt-3" style={{display: success ? '' : "none", width: '400px', margin: 'auto'}}>
                    New Account is Created. <Link to="/signin">Login Here</Link> 
                    </div>
                    </Slide>
      }

    return(
           <>
                  {showSuccess()}
                 {showError()}  
              
                   {FormPage()}
               
                  </>

              
               
    )}

export default SignUp