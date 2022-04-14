import React from "react";
import "./ScrollToTop.css";

function ScrollToTop() {
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="scroll-text pointer"
    >
      <span className="text-orange">Back to top</span>
      <i className="bi bi-arrow-right-circle-fill text-orange fs-1 ms-3"></i>
    </div>
  );
}

export default ScrollToTop;
