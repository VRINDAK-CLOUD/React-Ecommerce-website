import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './Firebase';
import { setDoc, doc } from 'firebase/firestore';
import './Register.css'; 

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const notifySuccess = () => toast.success("Registration successful!", { position: "top-center" });
  const notifyError = (err) => toast.error(err.message || "Registration failed.", { position: "top-center" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      notifySuccess();
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: name,
        lastName: lastname,
      });
    } catch (error) {
      notifyError(error);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-wrapper">
      <MDBContainer>
        <MDBRow className='d-flex justify-content-center align-items-center'>
          <MDBCol lg='8'>
            <MDBCard className='my-5 rounded-3 register-card'>
              <MDBCardImage
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp'
                className='register-image'
                alt='Sample'
              />
              <MDBCardBody className='px-5'>
                <h3 className="register-heading">Register</h3>
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Name'
                    id='name'
                    type='text'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Last Name'
                    id='lastname'
                    type='text'
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Email'
                    id='email'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Password'
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className='text-center'>
                    <MDBBtn
                      type='submit'
                      className='register-button'
                      size='lg'
                    >
                      Submit
                    </MDBBtn>
                    <p className='text-dark'>
                      Already registered? <a href='/login'>Login</a>
                    </p>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer />
    </div>
  );
}

export default Register;
