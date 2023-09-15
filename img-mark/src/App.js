import React, { useState } from "react";
import UploadImage from "./component/UploadImage/UploadImage";
import Preview from "./component/Preview/Preview";
import { MyContext } from "./ContextProvider";
import { stateEditor, statePreview } from "./common/variable";

function App({ defaultProps, unMountApp, imgurl, listMark }) {
  const [toggleTabs, setToggleTab] = useState(stateEditor);
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
      }}
    >
      <div className="widget-image-overlay"></div>
      <div className="widget-image-wrap">
        <div className="widget-image-container">
          {toggleTabs === stateEditor && (
            <UploadImage setToggleTab={setToggleTab} />
          )}
          {toggleTabs === statePreview && (
            <Preview setToggleTab={setToggleTab} />
          )}
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
