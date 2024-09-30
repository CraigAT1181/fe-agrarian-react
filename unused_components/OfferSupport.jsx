import React from "react";
import { useNavigate } from "react-router-dom";

export default function OfferSupport() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row align-items-center" style={{height: "35vw"}}>
        <div className="col-md-6 text-center">
          <h3>Donate via Paypal</h3>
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_top">
            <input
              type="hidden"
              name="hosted_button_id"
              value="F6C9BZTTTEDN8"
            />
            <button className="btn btn-success">Donate</button>
            <img
              alt=""
              border="0"
              src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
        </div>
        <div className="col-md-6 text-center">
          <h3>Donate via Buy Me a Coffee</h3>
          <button
            className="btn btn-success"
            onClick={() => window.location.href = "https://www.buymeacoffee.com/cookingpot"}>
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}
