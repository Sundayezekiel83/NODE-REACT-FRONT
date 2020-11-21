import React, {useState} from "react";
import {Slide, Fade} from 'react-reveal'
import {Link, Redirect} from 'react-router-dom'
import {signin,aunthenticate, isAunthenticated} from '../auth/auth'
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
  MDBIcon
} from "mdbreact";

 const SignIn = () =>{

  const [values, setValues] = useState({
      
      email: "",
      password: "",
      error: "",
      loading: false,
      redirectToReferal: "",
   
          })
        
       const {password, error, email, loading, redirectToReferal} = values   

    const handleChange = name => event =>{

      setValues({...values, error:false, [name]: event.target.value})

    }


   const handleSubmitButton = (e)=>{
      
      e.preventDefault()
      setValues({...values, error: false, loading:true})

      signin({email:email, password:password}).then(responses => {

        if(responses.error) {
          return setValues({
           ...values,  error: responses.error, loading: false, refertopage: false
          })
        }else{
          aunthenticate(responses, ()=>{

            setValues({
              ...values, 
              loading: false,
              redirectToReferal: true
                        })
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
                  <MDBCardHeader className="form-header rounded">
                    <h3 className="my-3 text-center text-info h4">
                    <MDBIcon icon="lock" /> LOGIN
                    </h3>
                  </MDBCardHeader>
                  <form>
                    <div className="grey-text">
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
                     
                    </div>
    
                  <div className="text-center mt-4">
                    <MDBBtn
                    onClick={handleSubmitButton}
                       
                      className="mb-3"
                      type="submit"
                      color="primary"
                    >
                     LOGIN
                    </MDBBtn>
                  </div>
                  </form>
                  <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Not a Member <Link to='/signup'>Register Here</Link></p>
                  
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
     <div className=" alert alert-danger text-center h6" style={{display: error ? '' : "none", width: '300px', margin: 'auto'}}>
                    {error}
                    </div>
                   </Slide>
      }

      const showLoading = () =>{
         return <>
              {loading && (<div className="spinner-grow text-primary center" role="status">
        
      </div>)}
           </>
      }
      const redirectUser = () =>{
        const {user} = isAunthenticated()
        if(redirectToReferal){
          if(user && user.role ===1){
            return <Redirect to='/admin/dashboard' />
          }else{
            return <Redirect to='/user/dashboard' />
          }

        }
        if(isAunthenticated()){
          return <Redirect to='/' />
        }
      }

    return(
           <>
                  {showLoading()}
                 {showError()}  
              
                   {FormPage()}

                   {redirectUser()}
               
                  </>

              
               
    )}

export default SignIn