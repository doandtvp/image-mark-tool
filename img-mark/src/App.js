import React, { useState } from "react";
import UploadImage from "./component/UploadImage/UploadImage";
import Preview from "./component/Preview/Preview";
import { MyContext } from "./ContextProvider";
import { stateEditor, statePreview } from "./common/variable";
import HeaderBar from "./component/HeaderBar/HeaderBar";
import FooterBar from "./component/FooterBar/FooterBar";

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
      <div className="fixed h-full pointer-events-none z-[1000] inset-0 bg-overlay backdrop-blur-[3px]"></div>
      <div className="fixed overflow-auto outline-none scrolling-touch z-[1000] inset-0 flex items-center justify-center">
        <div className="max-w-[1800px] flex-shrink-0 rounded-lg bg-modal shadow-modalBox relative">
          <HeaderBar />
          {toggleTabs === stateEditor && (
            <UploadImage setToggleTab={setToggleTab} />
          )}
          {toggleTabs === statePreview && (
            <Preview setToggleTab={setToggleTab} />
          )}
          <FooterBar />
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
