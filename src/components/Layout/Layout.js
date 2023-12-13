import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Result from "../../pages/Result";
import Login from "../../pages/Login"


const Layout = () => {

 
  return(
  <BrowserRouter>
  <Content />
  </BrowserRouter>
 )

};


const Content = () => {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Implement your authentication logic here
    const checkAuthentication = async () => {
      try {
        // Assuming you have a token stored in localStorage after successful login
        const token = localStorage.getItem("token");

        // Add your actual authentication logic here, for example, check the token
        if (token) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []); 

console.log('contentttt',authenticated  )
  return (
    
          <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" exact element={<Login />} /> 
          <Route path="/home" exact element={<Home />} /> 
          <Route path="/chat/:chatId" element={<Result />} /> 
          </Routes>

        //   <Routes>
        //   <Route path="*" element={<Navigate to="/" />} />
        //   <Route
        //     path="/"
        //     element={authenticated ? <Home /> : <Navigate to="/login" />}
        //   />
        //   <Route
        //     path="/result/:chatId"
        //     element={authenticated ? <Result /> : <Navigate to="/login" />}
        //   />
        //   <Route path="/login" element={<Login />} />
        // </Routes>
       
  );
};

export default Layout;