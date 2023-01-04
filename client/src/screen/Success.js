import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const queryString = require("query-string");
const axios = require("axios");

function Success(props) {
  useEffect(() => {
    console.log(props.location.search);
    const parsed = queryString.parse(props.location.search);
    console.log(parsed);
    const success = async () => {
      try {
        const address = JSON.parse(
          localStorage.getItem("soshandeliverdaddress")
        );
        const res = await axios.post(
          `${process.env.REACT_APP_MAIN_URL}api/user/execute`,
          { ...parsed, address: address }
        );
        console.log(res);
        localStorage.removeItem("shoshancart");
        window.location.href = "/";
        //history.push('"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-2SN6774787466370A"')
      } catch (error) {
        console.log(error);
      }
    };
    success();
  }, []);

  return (
    <div className="success-p">
      <div className="content flex flex-col aic">
        <Link to="/">
          <img src="/images/logo.png" className="img" />
        </Link>
        <div className="title font s16 c000">Thank you for your purchase.</div>
        <div className="txt font s16 c333">
          You will receive an email confirmation upon shipment. Please contact us
          regarding any changes to your order.
        </div>
      </div>
    </div>
  );
}

export default Success;
