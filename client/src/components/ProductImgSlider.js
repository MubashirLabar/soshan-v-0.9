import React from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ProductImgSlideShow from "./ProductImgSlideShow";

const ProductImgSlider = ({
  isPaneOpenRight,
  setIsPaneOpenRight,
  imageSrc,
  frontImage,
  backImage,
}) => {
  return (
    <SlidingPane
      isOpen={isPaneOpenRight}
      from="left"
      className="imgPane"
      onRequestClose={() => setIsPaneOpenRight(!isPaneOpenRight)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            outline: "none",
            fontSize: "1.6rem",
            padding: 0,
            marginRight: "auto",
            marginBottom: ".3rem",
            color: "black"
          }}
          onClick={() => setIsPaneOpenRight(!isPaneOpenRight)}
        >
          &times;
        </button>
        <ProductImgSlideShow frontImage={frontImage} backImage={backImage} />
      </div>
    </SlidingPane>
  );
};
export default ProductImgSlider;
