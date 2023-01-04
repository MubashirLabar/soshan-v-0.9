import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer flex aic">
      <a className="lin" href="mailto:contact@shoshan.co.il" target="_blank">
        <img src="/images/email.svg" className="img" />
      </a>
      <a
        className="lin"
        href="https://instagram.com/shoshan.co.il"
        target="_blank"
      >
        <img src="/images/instagram.svg" className="img" />
      </a>
      <a
        className="lin"
        href="https://api.whatsapp.com/send?phone=+1.347.389.5307"
        target="_blank"
      >
        <img src="/images/whatsapp.svg" className="img" />
      </a>
    </div>
  );
}

export default Footer;
