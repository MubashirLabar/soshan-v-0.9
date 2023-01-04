import "./css/App.scss";
import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from "./screen/LandingPage";
import Product from "./screen/Product";
import Success from "./screen/Success";
import Home from "./screen/Home";
import Dashboard from "./admin/Dashboard";
import Orders from "./admin/Orders";
import Setting from "./admin/Setting";
import Login from "./admin/Login";
import React, { useState, useEffect } from "react";
import Sidebar from "./admin/Sidebar";
import setheadertoken from "./middleware/setheadertoken";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Toast } from "./ui";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const login = async () => {
      const token = localStorage.getItem("tokenJWT77");
      //console.log('token',token)
      if (token) {
        try {
          //setheadertoken(token)
          //console.log('calling')
          const config = {
            headers: {
              tokenJWT77: token,
            },
          };
          const res = await axios.get(
            `${process.env.REACT_APP_MAIN_URL}api/theuser/checkuser`,
            config
          );
          //console.log(res)
          if (res.data.success == "true") {
            //console.log('logined')
            setheadertoken(token);
            dispatch({ type: "UPDATE_LOGIN_STATUS" });
            // history.push('/')
          }
        } catch (error) {
          console.log(error);
          if (error.response) {
            //localStorage.removeItem('tokenJWT77')
            if (error.response.data.errors) {
              Toast.show({ html: `${error.response.data.errors}`, time: 5 });
            } else {
              Toast.show({ html: `${error.response.data}`, time: 5 });
            }
          }
        }
      }
    };
    login();
  }, []);
  const { dialogID, isAdmin } = useSelector((state) => state);
  return (
    <div className="App">
      <BrowserRouter>
        {!isAdmin ? (
          <>
            {/* <Route exact path="/landing" component={LandingPage} />*/}
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/login" component={Login} />
          </>
        ) : (
          <div className="vendor-app flex rel">
            <Sidebar />
            <div className="vendor-content flex flex-col">
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/setting" component={Setting} />
            </div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
