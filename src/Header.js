import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="btn-hdr">Home</div>
      </Link>
      <Link to="/approve">
        <div className="btn-hdr">Approval</div>
      </Link>
    </div>
  );
};

export default Header;
