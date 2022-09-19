import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSigndIn,
  selectUserData,
  setSearchInput,
  setSignedIn,
  setUserData,
} from "../features/UserSlice";

import "../styling/Navbar.css";

const Header = () => {
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSigndIn);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  const clientId ="1002656378100-o1st12ju46qfp6tg14hth73son2c3b1g.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const logOut = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(inputValue));
  };

  return (
    <div className="navbar">
      <h1 className="navbar__header">BlogMania 💬</h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Search for a blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>
            Search
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar
            className="user"
            src={userData?.imageUrl}
            alt={userData?.name}
          />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            className="logout__button"
            clientId={clientId}
            buttonText=" Logout 😦"
            onLogoutSuccess={logOut}
          />
          {/* <GoogleLogout
            clientId="1084334404054-jch76dh3eqbj787ostatku2t93h61muv.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                Logout 😦
              </button>
            )}
            onLogoutSuccess={logout}
          /> */}
        </div>
      ) : (
        <h1 className="notSignedIn">User not available 😞</h1>
      )}
    </div>
  );
};

export default Header;
