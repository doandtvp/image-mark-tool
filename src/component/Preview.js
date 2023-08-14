import React, { useState } from "react";
import img from "../access/img/map-center-overflow.jpg";
import ModalDetail from "./ModalDetail";

function Preview({ listData }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({});
  const [zoom, setZoom] = useState(1)
  const [imgStyle, setImageStyle] = useState({})


  const selectAddress = (item) => {
    setCurrentAddress(item);
    setIsShowModal(true);
    setZoom(5)
    const newX = 50 - item.x
    let newY = 50 - item.y
    setImageStyle({
      transform: `translate(${newX}%, ${newY}%)`
    })
  };

  return (
    <div className="preview-image">
      <h1>Preview Image</h1>
      <div className="image-bound"
        style={{
          transform: `scale(${zoom})`
        }}
      >
        <img 
          src={img} 
          alt="abc" 
          style={imgStyle}
        />
        {listData.map((item) => (
          <React.Fragment key={item.x}>
              <div
                style={{
                  position: "absolute",
                  top: `${item.y}%`,
                  left: `${item.x}%`
                }}
              >
                <h3
                  onClick={() => selectAddress(item)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  {item.title}
                </h3>
              </div>
          </React.Fragment>
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
        />
      )}
    </div>
  );
}

export default Preview;
