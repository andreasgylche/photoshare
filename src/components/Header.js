import React from "react";
import { ReactComponent as UploadIcon } from "../assets/uploadIcon.svg";

function Header() {
  return (
    <header>
      <div className="header-brand">photoshare</div>
      <button className="header-upload">
        <UploadIcon />
      </button>
    </header>
  );
}

export default Header;
