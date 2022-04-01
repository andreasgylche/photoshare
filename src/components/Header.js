import React from "react";
import { ReactComponent as UploadIcon } from "../assets/uploadIcon.svg";

function Header() {
  return (
    <header>
      <div className="header-brand">photoshare</div>
      <form className="header-form">
        <input type="file" id="upload" />
        <label for="upload" tabindex="0">
          <UploadIcon />
          <span>Upload</span>
        </label>
      </form>
    </header>
  );
}

export default Header;
