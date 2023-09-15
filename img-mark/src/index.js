import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";
import Preview from "./component/Preview/Preview";
let rootApp;
let highestZindex = 0;

let defaultProps = {
  element: null,
  boundElement: null,
  getListAddressMark: (arr) => {
    defaultProps.element.setAttribute("lists", JSON.stringify(arr));
  },
};

let defaultPropsPreview = {
  element: null,
  boundElement: null,
};

window.ImageMarkTool = {
  init: (props = defaultProps) => {
    if (props.element) {
      const imgurl = props.element.src;
      const listMark = JSON.parse(props.element.getAttribute("lists")) || [];
      if (!rootApp) {
        rootApp = document.createElement("div");
        rootApp.id = "widget-image-map";
        rootApp.style.position = "relative";
        highestZindex = Math.max(
          ...Array.from(document.querySelectorAll("body *"), (el) =>
            parseFloat(window.getComputedStyle(el).zIndex)
          ).filter((zIndex) => !Number.isNaN(zIndex)),
          100
        );
        rootApp.style.zIndex = `${highestZindex + 10}`;
        document.body.appendChild(rootApp);
      }

      const root = createRoot(rootApp);

      const unMountApp = () => {
        rootApp.remove();
        root.unmount();
        rootApp = null;
      };

      root.render(
        <StrictMode>
          <App
            defaultProps={props}
            unMountApp={unMountApp}
            imgurl={imgurl}
            listMark={listMark}
          />
        </StrictMode>
      );
    } else {
      alert('Bạn chưa upload ảnh!')
    }
  },
  preview: (props = defaultPropsPreview) => {
    if (props.element.length > 0) {
      const root = createRoot(props.boundElement);

      const unMountComponent = (ref) => {
        console.log(ref);
      };

      root.render(
        <React.Fragment>
          {props.element.map((item, index) => {
            const imgUrl = item.src;
            const lists = JSON.parse(item.getAttribute("lists"));
            return (
              <Preview
                key={index}
                listDataProps={lists}
                imgUrl={imgUrl}
                unMountMultiComponent={unMountComponent}
              />
            );
          })}
        </React.Fragment>
      );
    } else if (props.element.hasAttribute("id")) {
      const imgUrl = props.element.src;
      const lists = JSON.parse(props.element.getAttribute("lists"));
      const root = createRoot(props.boundElement);

      const unMountComponent = () => {
        root.unmount();
        props.boundElement.appendChild(props.element);
      };

      root.render(
        <Preview
          listDataProps={lists}
          imgUrl={imgUrl}
          unMountComponent={unMountComponent}
        />
      );
    }
  },
};
