import "./Header.scss";
import React from "react";
import "./Header";
import Avatar from "@mui/material/Avatar";

function Header() {
  return (
    <div className="Header">
      <img
        src="../src/images/amoi_logo.png"
        alt="logo_a_moi"
        width={160}
        height={70}
      />
      {/* <h1>TP2 - React</h1> */}
      <Avatar className="avatar" />
    </div>
  );
}

export default Header;
