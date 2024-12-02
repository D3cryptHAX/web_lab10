import React from "react";
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <div className="cssload-container">
        <div className="cssload-circle"></div>
        <div className="cssload-circle"></div>
        <div className="cssload-circle"></div>
        <div className="cssload-circle"></div>
      </div>
    </div>
  );
};

export default Loader;
