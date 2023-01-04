import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Selector from "../components/Selector";
import Footer from "../components/Footer";
import { Dialog, generateID } from "../core";
import Cart from "./Cart";
import { Toast } from "../ui";
import { useDispatch } from "react-redux";
import Image3 from "../images/pic-3.jpeg";
import Image4 from "../images/pic-4.jpeg";

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "zoom-hover";
import axios from "axios";
import "../css/ProductRight.scss";
import data from "../data";
import ProductImgSlider from "../components/ProductImgSlider";
import ProductCartSlider from "../components/ProductCartSlider";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state

  return () => setValue((value) => value + 1); // update the state to force render
}

function Product({ match }) {
  const product = data.find((p) => p.slug === match.params.id);
  let frontImage = `../images/${product.front_image}`;
  let backImage = `../images/${product.back_image}`;

  const dispatch = useDispatch();
  const [cart, setcart] = useState(false);
  const [Size, setsize] = useState(null);
  const [Corner, setcorner] = useState(null);
  const [Tzstyle, setTzstyle] = useState(null);
  const [Tzcolor, setTzcolor] = useState(null);
  const [activeselector, setactiveselector] = useState({});
  const [Quantity, setquantity] = useState(1);
  const [activestatus, setactivestaus] = useState(true);
  const [imageSrc, setImageSrc] = useState(frontImage);

  const [isPaneOpenRight, setIsPaneOpenRight] = useState(false);
  const [isCartPaneOpen, setIsCartPaneOpen] = useState(false);

  /* Add to Cart */
  const _saveCart = () => {
    if (Size && Corner && Tzcolor && Tzstyle) {
      setIsCartPaneOpen(!isCartPaneOpen);
      // Toast.show({ html: "Added to cart successfully", type: "ok", time: 5 });
      const id = generateID(5, 5);
      const cart = JSON.parse(localStorage.getItem("shoshancartupdate"));
      if (cart) {
        localStorage.setItem(
          "shoshancartupdate",
          JSON.stringify([
            { id, Size, price: product.price, Corner, Tzcolor, Tzstyle },
            ...cart,
          ])
        );
      } else {
        localStorage.setItem(
          "shoshancartupdate",
          JSON.stringify([
            { id, Size, price: product.price, Corner, Tzcolor, Tzstyle },
          ])
        );
      }
      dispatch({
        type: "CART",
        payload: [
          {
            id,
            name: product.name,
            image: product.front_image,
            Size,
            Corner,
            price: product.price,
            Tzcolor,
            Tzstyle,
            Quantity: 1,
          },
        ],
      });
      setsize(null);
      setTzcolor(null);
      setTzstyle(null);
      setcorner(null);
      setactiveselector({});
      setcart(true);
    }
  };

  useEffect(() => {
    const getstatus = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_MAIN_URL}api/settings/getshopstatus`
        );
        console.log(res.data);
        setactivestaus(res.data.storestatus[0].activestore);
      } catch (error) {
        console.log(error);
      }
    };
    getstatus();
  }, []);

  return (
    <div className="product-p">
      <Header
        slug={product.slug}
        name={product.name}
        bread_crums={product.bread_crums}
        setIsCartPaneOpen={setIsCartPaneOpen}
        isCartPaneOpen={isCartPaneOpen}
      />
      <ProductCartSlider
        setIsCartPaneOpen={setIsCartPaneOpen}
        isCartPaneOpen={isCartPaneOpen}
      />
      <div className="wrap flex">
        <div className="left flex aic">
          <ProductImgSlider
            isPaneOpenRight={isPaneOpenRight}
            setIsPaneOpenRight={setIsPaneOpenRight}
            setImageSrc={setImageSrc}
            imageSrc={imageSrc}
            frontImage={frontImage}
            backImage={backImage}
          />
          <div>
            <div className="item">
              <img
                src={imageSrc}
                onMouseEnter={() => setImageSrc(backImage)}
                onMouseLeave={() => setImageSrc(frontImage)}
                onClick={() => setIsPaneOpenRight(!isPaneOpenRight)}
              ></img>
            </div>

            {/* Small screen */}
            <div className="item small-screen">
              <img
                src={frontImage}
                className="img"
                onClick={() => setIsPaneOpenRight(!isPaneOpenRight)}
              />
            </div>
          </div>
        </div>
        {/* Right Side */}
        {/* Use simple scss, scss also available with the name of ProductRight*/}
        <div className="right_panel container-fluid">
          <div className="row first_section">
            <div className="col-6 left_section">
              <h4 className="m-0 p-0 my-4">&#8362;{product.price}</h4>
            </div>
            <div className="col-6 right_section ">
              <button
                disabled={!activestatus}
                className={`btn m-0 p-0 py-4 ${activestatus ? "" : "closed"}`}
                onClick={() => {
                  _saveCart();
                }}
              >
                {activestatus ? "Purchase" : "Order Closed"}
              </button>
            </div>
          </div>
          <div className="row second_section">
            <div className="col-md-12 m-0 p-0">
              <p className="para_1 m-0 p-0 mx-4 mt-4 extraMargin">
                {product.description.line_1}
              </p>
              <p className="para_2 m-0 p-0 my-4 mx-4 extraMargin">
                {product.description.line_2}
              </p>
            </div>
          </div>
          <div className="row third_section">
            <div className="col-6 m-0 p-0 left_section">
              <ul className="m-0 p-0 mx-4 my-4 extraMargin">
                <li className="m-0 p-0 mb-4">Product size</li>
                <li className="m-0 p-0 mb-4">Corner style</li>
                <li className="m-0 p-0 mb-4">Tzitzit style</li>
                <li>Tzitzit color</li>
              </ul>
            </div>
            <div className="col-6 m-0 p-0 right_section">
              <ul className="m-0 p-0 mx-4 variationSelect my-4">
                <li className="m-0 p-0 mb-4">
                  <Selector
                    onchange={setsize}
                    selected={Size}
                    data={product.size}
                    type={"size"}
                    init={"Select"}
                    setSelector={setactiveselector}
                    activeselector={activeselector}
                  />
                </li>
                <li className="m-0 p-0 mb-4">
                  <Selector
                    onchange={setcorner}
                    selected={Corner}
                    data={product.corner}
                    type={"corner"}
                    init={"Select"}
                    setSelector={setactiveselector}
                    activeselector={activeselector}
                  />
                </li>
                <li className="m-0 p-0 mb-4">
                  <Selector
                    onchange={setTzstyle}
                    selected={Tzstyle}
                    data={product.tzStyle}
                    type={"tzStyle"}
                    init={"Select"}
                    setSelector={setactiveselector}
                    activeselector={activeselector}
                  />
                </li>
                <li>
                  <Selector
                    onchange={setTzcolor}
                    selected={Tzcolor}
                    data={product.tzColor}
                    type={"tzColor"}
                    init={"Select"}
                    setSelector={setactiveselector}
                    activeselector={activeselector}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="row fourth_section">
            <div className="col-md-12 p-0 m-0 mt-4">
              {product.features.map((item, idx) => (
                <p
                  className={`m-0 paraPoint para${
                    idx + 1
                  } mb-4 mx-4 extraMargin ${item.eastern ? "eastern" : ""}`}
                >
                  + {item.point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
