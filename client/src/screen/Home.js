import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../data";
import { Dialog, generateID } from "../core";
import { useDispatch } from "react-redux";
import "../css/dialog.css";

function Home() {
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState({ _id: 0 });
  
  // Here I get the product (id), to swap images for one product at a time, but in below src is same.
  const imageBChange = (id) => {
    setProductImage({ _id: id });
  };
  const imageFChange = () => {
    setProductImage({ _id: 0 });
  };

  return (
    <React.Fragment>
      <Header bread_crums="HANUKKA82" />
      {/* _addCart={_addCart} */}
      <div className="home-p flex aic">
        {data.map((item) => {
          const frontImage = `../images/${item.front_image}`;
          const backImage = `../images/${item.back_image}`;
          return (
            <Link to={`/product/${item.slug}`} className="lit">
              {productImage._id === item._id ? (
                <img
                  src={backImage}
                  onMouseLeave={() => imageFChange()}
                  className="img"
                />
              ) : (
                <img
                  src={frontImage}
                  onMouseEnter={() => imageBChange(item._id)}
                  className="img"
                />
              )}
            </Link>
          );
        })}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
