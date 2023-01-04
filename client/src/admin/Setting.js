import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "../ui";
import moment from "moment";

const Setting = () => {
  const [activecoupin, setActiveCoupon] = useState(false);
  const [activestore, setActiveStore] = useState(false);
  const [coupincode, setcoupincode] = useState("");
  const [loaded, setloaded] = useState(true);
  const [firstrender, setfirstrender] = useState(true);

  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  //console.log(activecoupin,activestore,coupincode)
  useEffect(() => {
    document.title = "Orders";
    window.__setNavTab && window.__setNavTab("/setting");

    const getinfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_MAIN_URL}api/settings/getsettings`
        );
        //console.log(res)
        if (res.data.success === "true") {
          const { activecoupin, activestore, coupincode } =
            res.data.settings[0];
          setActiveCoupon(activecoupin);
          setActiveStore(activestore);
          setcoupincode(coupincode);
          setloaded(true);
          setfirstrender(false);
        }
      } catch (error) {
        //console.log(error)
        if (error.response) {
          if (error.response.data.errors) {
            Toast.show({ html: `${error.response.data.errors}`, time: 5 });
          } else {
            Toast.show({ html: `${error.response.data}`, time: 5 });
          }
        }
      }
    };
    getinfo();
  }, []);

  const modifysettings = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}api/settings/modifysettings`,
        { activecoupin, activestore, coupincode }
      );
      Toast.show({ html: `Updated successfully`, type: "ok", time: 5 });
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

  const changepassword = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}api/theuser/changepassowrd`,
        { password, cpassword }
      );
      Toast.show({ html: `Updated successfully`, time: 5 });
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

  useEffect(() => {
    if (!firstrender) {
      modifysettings();
    }
  }, [activecoupin, activestore]);

  return (
    <>
      {loaded && (
        <div className="setting-p flex">
          {/* Login Info */}
          <div className="block flex flex-col">
            <div className="title font s20 b6 c000">Login Info</div>
            <input
              type="text"
              disabled
              placeholder="Username"
              value={"admin"}
              className="cleanbtn iput font s15 b5 c000 anim"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="cleanbtn iput font s15 b5 c000 anim"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
              className="cleanbtn iput font s15 b5 c000 anim"
            />
            <button
              onClick={() => changepassword()}
              className="button font s15 b5 cfff anim"
            >
              Update
            </button>
          </div>

          {/* Coupon Code */}
          <div className="block flex flex-col">
            <div className="title font s20 b6 c000">Coupon Code</div>
            <div className="swit flex aic anim">
              <div className="txt font s15 b5 c000">Active / Inactive</div>
              <button
                className={`cleanbtn switcher rel anim ${
                  activecoupin ? "on" : ""
                }`}
                onClick={() => {
                  setActiveCoupon(!activecoupin);
                }}
              />
            </div>
            <input
              //type='password'
              placeholder="code"
              value={coupincode}
              onChange={(e) => setcoupincode(e.target.value)}
              className="cleanbtn iput font s15 b5 c000 anim"
            />
            <button
              onClick={() => modifysettings()}
              className="button font s15 b5 cfff anim"
            >
              Update
            </button>
          </div>

          {/* Store */}
          <div className="block flex flex-col">
            <div className="title font s20 b6 c000">Store</div>
            <div className="swit flex aic anim">
              <div className="txt font s15 b5 c000">Open / Close</div>
              <button
                className={`cleanbtn switcher rel anim ${
                  activestore ? "on" : ""
                }`}
                onClick={() => setActiveStore(!activestore)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
