import React, { useState } from "react";
import img from "../../access/img/map-center-overflow.jpg";
import ModalDetail from "../ModalDetail/ModalDetail";
import { Link } from "react-router-dom";
import './Preview.css'
import Line from "../Line";
import MobileList from "../MobileList/MobileList";

function Preview() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({});
  const [zoom, setZoom] = useState(1);
  const [imgStyle, setImageStyle] = useState({});
  const [isDisplay, setIsDisplay] = useState("block");
  const listData = JSON.parse(localStorage.getItem("lists"));

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
        <h1>Preview Image</h1>
        <Link to="/">
          <button>Editor</button>
        </Link>
      </div>
      <div
        className="image-bound"
        style={{
          transform: `scale(${zoom})`,
          transition: "all 1s ease-in-out",
        }}
      >
        <img src={img} alt="abc" style={imgStyle} />
        {listData &&
          listData.length > 0 &&
          listData.map((item) => (
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
                    pointSize={7}
                  />
                  <h3
                    className="preview-title"
                    onClick={() => selectAddress(item)}
                    style={{ 
                      cursor: "pointer", 
                      top: item.addressPosititon.y,
                      left: item.addressPosititon.x
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
          listData={listData}
          setIsShowModal={setIsShowModal}
          zoom={zoom}
          setZoom={setZoom}
          setImageStyle={setImageStyle}
          selectAddress={selectAddress}
          setIsDisplay={setIsDisplay}
        />
      )}
      <MobileList
        listData={listData}
      />
    </div>
  );
}

export default Preview;
