import React, { useEffect } from "react";
import iconClose from "../access/icons/icon-close.svg";
import bottle from "../access/img/botte.jpg";

function ModalDetail({
  currentAddress,
  setCurrentAddress,
  listData,
  setIsShowModal,
  zoom,
  setZoom,
  setImageStyle,
  selectAddress,
  setIsDisplay
}) {

  useEffect(() => {
    selectAddress(currentAddress);
  }, [currentAddress]);

  const handleGetIndex = (isNext) => {
    const currentIndex = listData.findIndex(x => x.id === currentAddress.id);
    if (isNext) {
      if (currentIndex + 1 < listData.length) {
        setCurrentAddress(listData[currentIndex + 1]);
      }
    } else {
      if (currentIndex > 0) {
        setCurrentAddress(listData[currentIndex - 1]);
      }
    }
  };

  const handleCloseModal = (isClose) => {
    setIsShowModal(isClose);
    setZoom(1);
    setImageStyle({});
    setIsDisplay('block')
  };

  return (
    <div className="modal-detail">
      <div className="modal-content">
        <div className="modal-container">
          <div className="infor-content">
            <img className="modal-content-img" src={bottle} alt="img" />
            <div>
              <h3 className="modal-content-title">{currentAddress.title}</h3>
            </div>
            <div>
              <p className="modal-content-description">{currentAddress.description}</p>
            </div>
          </div>

          <div className="img-content"></div>
        </div>
        <div className="slider-button">
          <button onClick={() => handleGetIndex(false)}>Prev</button>
          <button onClick={() => handleGetIndex(true)}>Next</button>
        </div>
        <button className="close-btn" onClick={() => handleCloseModal(false)}>
          <img src={iconClose} />
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transition: "all 1s ease-in-out"
        }}
      >
        <h3
          className="preview-title"
          style={{
            cursor: "pointer",
            transform: 'scale(1.7)',
            transition: "all 1s ease-in-out"
          }}
        >
          {currentAddress.title}
        </h3>
      </div>
    </div>
  );
}

export default ModalDetail;
