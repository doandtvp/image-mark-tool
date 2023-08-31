import React, { useContext, useEffect, useRef, useState } from "react";
import img from "../../access/img/map-center-overflow.jpg";
import ModalDetail from "../ModalDetail/ModalDetail";
import './Preview.css'
import Line from "../Line";
import MobileList from "../MobileList/MobileList";
import { MyContext } from "../../ContextProvider";

function Preview({ setToggleTab }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({});
  const [zoom, setZoom] = useState(1);
  const [imgStyle, setImageStyle] = useState({});
  const [isDisplay, setIsDisplay] = useState("block");
  const titleRef = useRef({})
  const { listDataMap, file } = useContext(MyContext);

  const selectAddress = (item) => {
    setCurrentAddress(item);
    setIsDisplay("none");
    setIsShowModal(true);
    const checkCondition = item.x > 20 && item.x < 80 && item.y > 20 && item.y < 80
    if (checkCondition) {
      setZoom(3);
    } else {
      setZoom(8);
    }
    const newX = 50 - item.x;
    const newY = 50 - item.y;
    setImageStyle({
      transform: `translate(${checkCondition ? newX + 8 : newX + 3}%, ${checkCondition ? newY - 4 : newY - 3}%)`,
      transition: "all 1s ease-in-out",
    });
  };

  return (
    <div className="preview-image">
      <div className="upload-title">
        <button onClick={() => setToggleTab(true)}>Chỉnh Sửa</button>
        <button>Đóng</button>
      </div>
      <div
        className="image-bound"
        style={{
          transform: `scale(${zoom})`,
          transition: "all 1s ease-in-out",
        }}
      >
        <img src={file || img} alt="abc" style={imgStyle} />
        {listDataMap &&
          listDataMap.length > 0 &&
          listDataMap.map((item) => (
            <div className="preview-wraper" key={item.id}>
              <div
                style={{
                  position: "absolute",
                  top: `${item.y}%`,
                  left: `${item.x}%`,
                  transition: "all 1s ease-in-out",
                  width: "100%",
                  display: isDisplay
                }}
              >
                <div>
                  <div className="white-mark"></div>
                  <Line
                    source={{x:0, y:0}}
                    target={item.addressPosititon}
                    titleRef={titleRef}
                  />
                  <h3
                    className="preview-title"
                    ref={titleRef}
                    onClick={() => selectAddress(item)}
                    style={{ 
                      cursor: "pointer", 
                      top: item.addressPosititon.y,
                      left: item.addressPosititon.x,
                      transform: `translate(${item.linePosition.x}%, ${item.linePosition.y}%)`
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
          listData={listDataMap}
          setIsShowModal={setIsShowModal}
          zoom={zoom}
          setZoom={setZoom}
          setImageStyle={setImageStyle}
          selectAddress={selectAddress}
          setIsDisplay={setIsDisplay}
        />
      )}
      <MobileList
        listData={listDataMap}
      />
    </div>
  );
}

export default Preview;
