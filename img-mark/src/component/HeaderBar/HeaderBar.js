import React from "react";
import "./HeaderBar.css";
import IconClose from "../../access/icons/icon-close-black.svg";

function HeaderBar() {
  return (
    <div className="header-bar">
      <div className="header-bar-title">Đánh Dấu Tọa Độ Ảnh</div>
      <div className="header-bar-btn">
        <i className="icon-close-modal">
          <IconClose />
        </i>
      </div>
    </div>
  );
}

export default HeaderBar;
