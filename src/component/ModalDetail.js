import React, { useEffect } from "react";

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
    const currentIndex = listData.indexOf(currentAddress);
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
            <h2>Information</h2>
            <div>
              <h3>Name</h3>
              <p>{currentAddress.title}</p>
            </div>
            <div>
              <h3>Description</h3>
              <p>{currentAddress.description}</p>
            </div>
          </div>
          <div className="img-content"></div>
        </div>
        <div className="slider-button">
          <button onClick={() => handleGetIndex(false)}>Prev</button>
          <button onClick={() => handleGetIndex(true)}>Next</button>
        </div>
        <button className="close-btn" onClick={() => handleCloseModal(false)}>
          Close
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
          style={{
            color: "red",
            cursor: "pointer",
            transform: `scale(${zoom})`,
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
