import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { useFetch } from "../../hooks/useFetch";
import axios from 'axios'

const Login = () => {

  
  const handlGoogleOauth = () => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    window.open(`${SERVER_URL}/auth/google`)
  }

  /* useEffect(() => {
    if (window.google) {
      // console.log()
      const client_id = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;
      google.accounts.id.initialize({
        client_id,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("google"), {
        // type: "standard",
        theme: "filled_blue",
        // size: "small",
        text: "continue_with",
        shape: "rectangular",
        size : 'large', 
        
      });

      google.accounts.id.prompt()
    }
  }, [handleGoogle])
   */

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <div className="text-3xl font-semibold text-center text-gray-300 space-y-5">
          <h1 className="text-accent">
            Login/Signup
            <span className="text-primary"> CHATOOO</span>
          </h1>

        <div className="text-secondary-content">
          <div className="space-y-3">
            <div>
              <button
                id = "google"
                className="btn btn-block border-secondary bg-white btn-sm mt-2 rounded-none w-9/12"
                /* disabled={loading} */
                onClick={handlGoogleOauth}
              >
                
                <div className="flex justify-between w-full px-2 items-center">
                  <FaGoogle />
                  <span className="text-base text-contend-secondary">
                    LOGIN WITH GOOGLE
                  </span>
                </div>
              
              </button>              
            </div>
            
            <div>
              <button
                className="btn btn-block border-primary bg-white btn-sm mt-2 rounded-none w-9/12 hover:bg-primary"
                // disabled={loading}
              >
              
                <div className="flex justify-between w-full px-2 items-center">
                  <FaFacebook />
                  <span className="text-base text-contend-secondary">
                    LOGIN WITH FACEBOOK
                  </span>
                </div>
              
              </button>           
            </div>

          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
