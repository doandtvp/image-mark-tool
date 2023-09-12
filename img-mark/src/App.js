import React, { useState } from "react";
import UploadImage from "./component/UploadImage/UploadImage";
import Preview from "./component/Preview/Preview";
import { MyContext } from "./ContextProvider";
import { getAspectRatio } from "./common/getAspectRatio";

function App({ defaultProps, unMountApp }) {
  const imgurl = defaultProps.element ? defaultProps.element.src : "";
  const imgRatio = getAspectRatio(defaultProps.element);
  const listMark = defaultProps.element.hasAttribute("lists")
    ? JSON.parse(defaultProps.element.getAttribute("lists"))
    : [];
  const [toggleTabs, setToggleTab] = useState(true);
  const [listDataMap, setListDataMap] = useState(listMark);
  const [file, setFile] = useState(imgurl);

  return (
    <MyContext.Provider
      value={{
        listDataMap,
        setListDataMap,
        file,
        setFile,
        defaultProps,
        unMountApp,
        imgRatio,
      }}
    >
      <div className="widget-image-overlay"></div>
      <div className="widget-image-wrap">
        <div className="widget-image-container">
          <div
            style={{
              display: `${toggleTabs ? "block" : "none"}`,
              transition: "all 1s ease-in-out",
              width: "100%",
            }}
          >
            <UploadImage setToggleTab={setToggleTab} />
          </div>
          <div
            style={{
              display: `${toggleTabs ? "none" : "block"}`,
              transition: "all 1s ease-in-out",
              width: "100%",
            }}
          >
            <Preview setToggleTab={setToggleTab} />
          </div>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
