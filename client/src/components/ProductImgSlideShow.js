import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ProductImgSlideShow = ({ frontImage, backImage }) => {
  const slideImages = [
    {
      url: frontImage,
      caption: "Front Image",
    },
    {
      url: backImage,
      caption: "Back Image",
    },
  ];
  return (
    <div className="slide-container">
      <Slide autoplay={false}>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <img className="slide-main-img" src={slideImage.url} />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ProductImgSlideShow;
