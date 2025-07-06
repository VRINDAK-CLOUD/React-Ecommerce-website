import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase'; 
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notifySuccess = () => toast.success("Login successful!");
  const notifyError = (msg) => toast.error(msg || "Login failed!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      notifySuccess();
      console.log("Email:", email);
      console.log("Password:", password);
      navigate("/home"); 
    } catch (error) {
      notifyError(error.message); 
    }
  };

  return (
    <div className="login-page">
      <MDBContainer className="login-container">
        <form onSubmit={handleSubmit}>
          <MDBInput
            wrapperClass='mb-4'
            label='Email address'
            id='form1'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <MDBInput
            wrapperClass='mb-4'
            label='Password'
            id='form2'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox
              name='flexCheck'
              value=''
              id='flexCheckDefault'
              label='Remember me'
            />
          </div>

          <MDBBtn type="submit" className="mb-4 login-btn">
            Sign in
          </MDBBtn>
        </form>

        <div className="text-center">
          <p>Not a member? <a href="/">Register</a></p>
        </div>
      </MDBContainer>
      <ToastContainer />
    </div>
  );
}

export default Login;
