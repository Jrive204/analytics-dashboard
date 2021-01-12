import React, { useState, useEffect } from 'react';
import './App.css';
// import { renderButton, checkSignedIn } from './GoogleAuth/authUtils';
import Dashboard from './Dashboard/dashboard';
import styled from 'styled-components';
import Footer from './Components/footer';
import axios from 'axios';
import { renderButton, checkSignedIn } from './GoogleAuth/authUtils';

function App() {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedIn] = useState(true);

  // const updateSignin = signedIn => {
  //   setIsSignedIn(signedIn);
  //   if (!signedIn) {
  //     renderButton();
  //   }
  // };

  // const init = () => {
  //   checkSignedIn()
  //     .then(signedIn => {
  //       updateSignin(signedIn);
  //       window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  useEffect(() => {
    // window.gapi.load('auth2', init);
    axios.get('http://localhost:5000/api/googleanalytics').then(res => {
      console.log(res, '??');
      window.gapi.client.setToken({
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
        access_token: res.data.access_token,
      });
    });
  });

  return (
    <div className="App">
      {!isSignedIn ? (
        <>
          <Title>Google Analytics Dashboard</Title>
          <ButtonContainer>
            <div id="signin-button"></div>
          </ButtonContainer>
          <Footer />
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;

const ButtonContainer = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  padding-top: 10vmin;
  margin-top: 0;
`;
