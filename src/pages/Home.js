import React,{ useEffect } from 'react';
import Header from "../components/Header";
import Blogs from '../components/Blogs';
import { useDispatch, useSelector } from 'react-redux';
import { selectSigndIn, setUserData, setSignedIn } from '../features/UserSlice';
import '../styling/Home.css';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';


const Home = (props) => {
    const isSignedIn = useSelector(selectSigndIn);
    const dispatch = useDispatch();

    const clientId = '1002656378100-o1st12ju46qfp6tg14hth73son2c3b1g.apps.googleusercontent.com';

    useEffect(() => {
      const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: ''
          });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (response) => {
      console.log('success:', response);
      dispatch(setSignedIn(true));
      dispatch(setUserData(response.profileObj))
    };

    const onFailure = (err) => {
        console.log('failed:', err);
    };
    return (
      <>
        <Header />
        <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
        {!isSignedIn ? (
          <div className="login__message">
            <h2>📗</h2>
            <h1>A Readers favourite place!</h1>
            <p>
              We provide high quality online resource for reading blogs. Just sign
              up and start reading some quality blogs.
            </p>
            <GoogleLogin
                className="login__button"
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      </>
    )
}

export default Home
