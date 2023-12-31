import React, { useContext, useEffect, useRef, useState } from "react";
import ModalDetail from "../ModalDetail/ModalDetail";
import "./Preview.css";
import Line from "../Line";
import MobileList from "../MobileList/MobileList";
import { MyContext } from "../../ContextProvider";
import {
  maxZoomImage,
  minPercentModal,
  scaleLeft,
  scaleTop,
  stateEditor,
} from "../../common/variable";
import { useZoom } from "../../common/useZoom";

function Preview({
  setToggleTab,
  listDataProps,
  imgUrl,
  unMountComponent,
  unMountMultiComponent,
}) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({});
  const [zoom, setZoom] = useState(1);
  const [isDisplay, setIsDisplay] = useState("block");
  const titleRef = useRef({});
  const { listDataMap, file, unMountApp } = useContext(MyContext);
  const [listDataAddress, setLisDataAddress] = useState([]);
  const [isShow, setIsShow] = useState(true);
  const [imgStyle, setImageStyle] = useState({});

  useEffect(() => {
    if (listDataProps) {
      setLisDataAddress(listDataProps);
    } else {
      setLisDataAddress(listDataMap);
    }
  }, [listDataProps, listDataMap]);

  const selectAddress = (item) => {
    setCurrentAddress(item);
    setIsDisplay("none");
    setIsShowModal(true);
    setZoom(maxZoomImage);
    const newX = minPercentModal - item.x;
    const newY = minPercentModal - item.y;
    setImageStyle({
      transform: `translate(${newX + scaleLeft}%, ${newY - scaleTop}%)`,
    });
  };

  const handleCloseApp = () => {
    if (unMountMultiComponent) {
      setIsShow(false);
    } else if (unMountComponent) {
      unMountComponent();
    } else {
      unMountApp();
    }
  };

  return (
    <>
      {isShow && (
        <div className="preview-image">
          <div
            className="upload-title"
            style={{ display: `${isDisplay !== "none" ? "flex" : isDisplay}` }}
          >
            {imgUrl ? (
              <div></div>
            ) : (
              <button onClick={() => setToggleTab(stateEditor)}>
                Chỉnh Sửa
              </button>
            )}
            <button onClick={handleCloseApp}>Đóng</button>
          </div>
          <div
            className="image-bound"
            style={{
              transform: `scale(${zoom})`,
            }}
          >
            <img
              className="image-show"
              src={imgUrl ? imgUrl : file}
              alt="abc"
              style={imgStyle}
            />
            {listDataAddress &&
              listDataAddress.length > 0 &&
              listDataAddress.map((item) => (
                <div className="preview-wraper" key={item.id}>
                  <div
                    className="preview-item"
                    style={{
                      top: `${item.y}%`,
                      left: `${item.x}%`,
                      opacity: `${isDisplay === "block" ? 1 : 0}`,
                      transition: `all ${
                        isDisplay === "block" ? 1 : 0
                      }s ease-in-out`,
                    }}
                  >
                    <div>
                      <div className="white-mark"></div>
                      <Line
                        source={{ x: 0, y: 0 }}
                        target={item.addressPosititon}
                        titleRef={titleRef}
                      />
                      <h3
                        className="preview-title"
                        ref={titleRef}
                        onClick={() => selectAddress(item)}
                        style={{
                          top: item.addressPosititon.y,
                          left: item.addressPosititon.x,
                          transform: `translate(${item.linePosition.x}%, ${item.linePosition.y}%)`,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {isShowModal && (
            <ModalDetail
              currentAddress={currentAddress}
              setCurrentAddress={setCurrentAddress}
              listData={listDataAddress}
              setIsShowModal={setIsShowModal}
              zoom={zoom}
              setZoom={setZoom}
              setImageStyle={setImageStyle}
              selectAddress={selectAddress}
              setIsDisplay={setIsDisplay}
            />
          )}
          <MobileList listData={listDataAddress} />
        </div>
      )}
    </>
  );
}

export default Preview;
