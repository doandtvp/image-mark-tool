import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";
const btnClick = document.getElementById("click-me");
const fileInput = document.getElementById("image-upload");
const mainWrapper = document.getElementById("main");
let highestZindex = 0

let defaultProps = {
  element: null,
  getListAddressMark: (arr) => {
    defaultProps.element.dataset.lists = JSON.stringify(arr)
  },
};


const ImageMarkTool = {
  init: (props = defaultProps) => {
    if (!props.element) {
      window.alert("Bạn cần tải ảnh lên!");
    } else {
      let div = document.createElement("div");
      div.id = "root";
      div.style.zIndex = `${highestZindex + 10}`
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

window.addEventListener("load", function() {
  highestZindex = Math.max(
    ...Array.from(document.querySelectorAll('body *'), el =>
      parseFloat(window.getComputedStyle(el).zIndex),
    ).filter(zIndex => !Number.isNaN(zIndex)),
    100,
  )
})

btnClick.addEventListener("click", function () {
  ImageMarkTool.init();
});

fileInput.onchange = (event) => {
  if (event) {
    const img = document.createElement("img");
    img.src =  URL.createObjectURL(event.target.files[0]);
    img.alt = 'input-img'
    img.id = 'input-img'
    defaultProps.element = img;
  }
};
