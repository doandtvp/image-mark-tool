import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";
const btnClick = document.getElementById("click-me");
const fileInput = document.getElementById("image-upload");
const mainWrapper = document.getElementById("main");

let defaultProps = {
  element: null,
  callback: () => {},
};

const ImageMarkTool = {
  init: (props = defaultProps) => {
    if (!props.element) {
      window.alert("Bạn cần tải ảnh lên!");
    } else {
      let div = document.createElement("div");
      div.id = "root";
      mainWrapper.appendChild(div);
      const root = createRoot(document.getElementById("root"));
      root.render(
        <StrictMode>
          <App defaultProps={defaultProps} />
        </StrictMode>,
      );
    }
  },
};

btnClick.addEventListener("click", function () {
  ImageMarkTool.init();
});

fileInput.onchange = (event) => {
  if (event) {
    defaultProps.element = event.target.files[0];
  }
};
