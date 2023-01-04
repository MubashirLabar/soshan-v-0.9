import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Toast } from "../ui";
import { focus, isValidEmail, generateID } from "../core";
import Selector from "../components/Selector";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const Cart = (props) => {
  //console.log(props.id)
  const [step, setStep] = useState("cart");
  //const [price,setprice] = useState('')

  const [fullname, setfullname] = useState("");
  const [streetaddress, setstreetaddress] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [country, setcountry] = useState("");
  const [cellphone, setcellphone] = useState("");
  const [checkoutbtn, setcheckoutbtn] = useState("Ship to this address");
  const [Quantity, setquantity] = useState(1);
  const [disabled, setdisabled] = useState(false);
  const [code, setcode] = useState("");
  const [email, setemail] = useState("");
  const [items, setitems] = useState("");
  const [subtotal, setsubtotal] = useState("");
  const dispatch = useDispatch();
  /*useEffect(() => {
       const items = JSON.parse(localStorage.getItem('shoshancartupdate'));
       setitems(items)
    },[])*/
  const { dialogID, cartItems } = useSelector((state) => state);
  //console.log(dialogID)
  useEffect(() => {
    const oldaddress = JSON.parse(
      localStorage.getItem("soshandeliverdaddress")
    );
    if (oldaddress) {
      setfullname(oldaddress.fullname);
      setstreetaddress(oldaddress.streetaddress);
      //setaddress(oldaddress.address)
      setcity(oldaddress.city);
      setstate(oldaddress.state);
      setcountry(oldaddress.country);
      setpostalcode(oldaddress.postalcode);
      setcellphone(oldaddress.cellphone);
      setemail(oldaddress.email);
    }
  }, []);

  useEffect(() => {
    // if (cartItems.length == 0) {
    //   window.__modals[dialogID].Hide();
    // }
    // console.log(cartItems);
    let calsubtotal = 0;
    cartItems.map((item) => {
      if (item.Tzcolor === "Techelet (₪100)") {
        calsubtotal = calsubtotal + item.Quantity * (item.price + 100);
      } else {
        calsubtotal = calsubtotal + item.Quantity * item.price;
      }
      // console.log(calsubtotal);
      setsubtotal(calsubtotal.toFixed(2));
    });
  }, [cartItems]);

  const _cart = () => {
    return (
      <>
        {cartItems.length === 0 ? (
          <div className="emtpy-carty flex flex-col">
            {/* <div className="title font s16 c000">Your cart is empty.</div> */}
          </div>
        ) : (
          <div className={`cart flex flex-col anim mt-4`}>
            <div className="wrap flex flex-col">
              {cartItems?.map((item, idx) => (
                <div className="flex">
                  <div className="lit flex flex-col">
                    <img src={`../images/${item.image}`} className="img" />
                  </div>
                  <div className="rit flex flex-col">
                    <div className="items">
                      <div className="blk flex flex-col">
                        <div className="">{item.name}</div>
                        <div className="item flex aic">
                          <div className="">{item.Size}</div>
                        </div>
                        <div className="item flex aic">
                          <div className="">{item.Corner}</div>
                        </div>
                        <div className="item flex aic">
                          <div className="">{item.Tzstyle}</div>
                        </div>
                        <div className="item flex aic">
                          <div className="">{item.Tzcolor}</div>
                        </div>

                        <div className="item">
                          <div className="value flex ">
                            {item.Quantity}
                            <span className="font ">&nbsp;&times;&nbsp;</span>
                            {`₪${
                              item.Tzcolor === "Techelet (₪100)"
                                ? item.price + 100
                                : item.price
                            }`}
                          </div>
                        </div>

                        <div className="item flex aic">
                          <div className="qty flex aic">
                            <button
                              onClick={() => {
                                if (item.Quantity > 1) {
                                  dispatch({
                                    type: "CART_UPDATE",
                                    payload: {
                                      id: item.id,
                                      Quantity: item.Quantity - 1,
                                    },
                                  });
                                }
                              }}
                              className="cleanbtn btn icon-minus font s15 c333 anim flex aic"
                            />
                            <input
                              disabled
                              value={`${item.Quantity}`}
                              className="cleanbtn iput font  c333"
                            />
                            <button
                              onClick={() => {
                                if (item.Quantity < 30) {
                                  dispatch({
                                    type: "CART_UPDATE",
                                    payload: {
                                      id: item.id,
                                      Quantity: item.Quantity + 1,
                                    },
                                  });
                                }
                              }}
                              className="cleanbtn btn icon-plus font  c333 anim flex aic"
                            />
                          </div>
                          <button
                            onClick={() => {
                              dispatch({
                                type: "CART_DELETE_ITEM",
                                payload: { id: item.id },
                              });
                            }}
                            className="cross cleanbtn font s24 flex aic"
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="total flex aic">
              <div className="tt font black">
                <span className="">Subtotal :</span>
                <span>
                  {" "}
                  <strong style={{ fontWeight: 300, fontSize: "1.4rem" }}>
                    &#8362;
                  </strong>
                  {subtotal}
                </span>
              </div>
            </div>
            <div className="actions flex aic">
              <button
                className="btn button font checkoutBtn c000 anim pt11"
                onClick={() => setStep("checkout")}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  const saveaddress = () => {
    let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullname) {
      //Toast.show({html: "Please enter your full name.", time: 5})
      focus("._fullname");
    } else if (!streetaddress) {
      //Toast.show({html: "Please enter your correct street address.", time: 5})
      focus("._street");
    } else if (!city) {
      //Toast.show({html: "Please enter your city name.", time: 5})
      focus("._city");
    } else if (!country) {
      //Toast.show({html: "Please enter your country.", time: 5})
      focus("._country");
    } else if (!cellphone) {
      //Toast.show({html: "Please enter your cellphone.", time: 5})
      focus("._phone");
    } else if (!email || !email.match(themail)) {
      //Toast.show({html: "Please enter valid email address."})
      focus("._email");
    } else {
      localStorage.setItem(
        "soshandeliverdaddress",
        JSON.stringify({
          fullname,
          streetaddress,
          address,
          city,
          state,
          postalcode,
          country,
          cellphone,
          email,
        })
      );
      checkout();
      // setStep('payment')
    }
  };

  const checkout = async () => {
    setcheckoutbtn("Loading...");
    setdisabled(true);
    try {
      const oldaddress = JSON.parse(
        localStorage.getItem("soshandeliverdaddress")
      );
      if (code) {
        const res = await axios.post(
          `${process.env.REACT_APP_MAIN_URL}api/user/checkcode`,
          { code }
        );
        console.log(res.data);
        if (res.data.compared) {
          //Toast.show({ html: `Your code was correct you got 20% discount`,type : "ok", time: 5 });
        } else if (!res.data.compared) {
          //Toast.show({ html: `Your code was incorrect, No discount`,type : "error", time: 5 });
        }
      }
      console.log("cart...", {
        ...props.data,
        code: code,
        address: oldaddress,
      });
      const res = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}api/user/createorder`,
        { ...props.data, cart: cartItems, code: code, address: oldaddress }
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
      setdisabled(true);
      if (error.response) {
        //Toast.show({ html: `${error.response.data.errors}`,type : "error", time: 5 });
        return false;
      }
    }
  };

  const _checkout = () => {
    return (
      <div className="checkout flex flex-col">
        <div className="item flex flex-col">
          <input
            text="text"
            onChange={(e) => setfullname(e.target.value)}
            value={fullname}
            placeholder="Name"
            className="iput _fullname cleanbtn font  c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <input
            text="text"
            onChange={(e) => setstreetaddress(e.target.value)}
            value={streetaddress}
            placeholder="Street"
            className="iput _street cleanbtn font  c333 anim"
          />
        </div>
        {/*
                <div className="item flex flex-col">
                    <input text="text" onChange={e => setaddress(e.target.value)} value={address} placeholder='Address (optional)' className="iput cleanbtn font  c333 anim" />
                </div>
                */}
        <div className="item flex flex-col">
          <input
            text="text"
            onChange={(e) => setcity(e.target.value)}
            value={city}
            placeholder="City"
            className="iput _city cleanbtn font c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <input
            text="text"
            onChange={(e) => setstate(e.target.value)}
            value={state}
            placeholder="State"
            className="iput _state cleanbtn font c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <input
            text="text"
            onChange={(e) => setpostalcode(e.target.value)}
            value={postalcode}
            placeholder="Post code"
            className="iput _postal cleanbtn font c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <input
            text="text"
            onChange={(e) => setcountry(e.target.value)}
            value={country}
            placeholder="Country"
            className="iput _country cleanbtn font c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <input
            type="number"
            onChange={(e) =>
              setcellphone(e.target.value.replace(/[^0-9\.]/g, ""))
            }
            value={cellphone}
            placeholder="Phone"
            className="iput _phone cleanbtn font c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            placeholder="Email"
            className="iput _email cleanbtn font c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <input
            onChange={(e) => setcode(e.target.value)}
            type="text"
            className="iput cleanbtn font c333 anim"
            placeholder="Promo code"
            value={code}
          />
        </div>
        <div className="item flex flex-col">
          <button
            disabled={disabled}
            className="button shipButton btn font "
            onClick={() => saveaddress()}
          >
            {checkoutbtn}
          </button>
        </div>
      </div>
    );
  };

  const _payment = () => {
    return (
      <div className="payment flex flex-col aic">
        <div className="item flex flex-col">
          <button className="button btn font s15 b" onClick={() => checkout()}>
            {checkoutbtn}
          </button>
        </div>
      </div>
    );
  };

  switch (step) {
    case "cart":
      return _cart();
    case "checkout":
      return _checkout();
    case "payment":
      return _payment();
    default:
      return _cart();
  }
};

export default Cart;
