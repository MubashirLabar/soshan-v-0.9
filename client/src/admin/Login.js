import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Toast } from "../ui";
import { useHistory } from "react-router-dom";
import setheadertoken from "../middleware/setheadertoken";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();
  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}api/theuser/loginuser`,
        { password, username }
      );
      //console.log(res)
      if (res.data.success == "true") {
        //console.log(res.data.token)
        localStorage.setItem("tokenJWT77", res.data.token);
        setheadertoken(res.data.token);
        dispatch({ type: "UPDATE_LOGIN_STATUS" });
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data.errors) {
          Toast.show({ html: `${error.response.data.errors}`, time: 5 });
        } else {
          Toast.show({ html: `${error.response.data}`, time: 5 });
        }
      }
    }
  };

  return (
    <div className="login-p flex flex-col aic">
      <div className="container flex flex-col aic">
        <div className="meta flex aic">
          <img src="/images/logo.png" className="logo" />
        </div>
        <div className="form flex flex-col">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setusername(e.target.value)}
            className="cleanbtn iput font s15 b5 c000 anim"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            className="cleanbtn iput font s15 b5 c000 anim"
          />
          <button
            onClick={() => login(username, password)}
            className="button font s15 b5 cfff anim"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
