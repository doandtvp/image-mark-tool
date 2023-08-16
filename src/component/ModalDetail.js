import React, { useEffect } from "react";
import iconClose from "../access/icons/icon-close.svg";
import bottle from "../access/img/botte.jpg";
import arrow from "../access/icons/icon-arrow.png";

function ModalDetail({
  currentAddress,
  setCurrentAddress,
  listData,
  setIsShowModal,
  zoom,
  setZoom,
  setImageStyle,
  selectAddress,
  setIsDisplay,
}) {
  const currentIndex = listData.findIndex((x) => x.id === currentAddress.id);

  useEffect(() => {
    selectAddress(currentAddress);
  }, [currentAddress]);

  const handleGetIndex = (isNext) => {
    if (isNext) {
      if (currentIndex + 1 === listData.length) {
        setCurrentAddress(listData[0]);
      } else {
        setCurrentAddress(listData[currentIndex + 1]);
      }
    } else {
      if (currentIndex === 0) {
        setCurrentAddress(listData[listData.length - 1]);
      } else {
        setCurrentAddress(listData[currentIndex - 1]);
      }
    }
  };

  const handleCloseModal = (isClose) => {
    setIsShowModal(isClose);
    setZoom(1);
    setImageStyle({});
    setIsDisplay("block");
  };

  return (
    <div className="modal-detail">
      <div className="modal-content">
        <div className="modal-container">
          <div className="infor-content">
            <img className="modal-content-img" src={bottle} alt="img" />
            <div>
              <div className="modal-title-bound">
                {currentAddress.title.split(" ").length > 1 ? (
                  <>
                    <span>{currentAddress.title.split(" ")[0]}</span>
                    <h3 className="modal-content-title">
                      {currentAddress.title.split(" ").slice(1).join(" ")}
                    </h3>
                  </>
                ) : (
                  <h3 className="modal-content-title">
                    {currentAddress.title}
                  </h3>
                )}
              </div>
            </div>
            <div>
              <p className={currentAddress.description.length > 150 ? "modal-content-description" : "modal-content-less-description"}>
                {currentAddress.description}
              </p>
            </div>
          </div>

          <div className="img-content">
            <div className="view-area"></div>
          </div>
        </div>

        <button className="close-btn" onClick={() => handleCloseModal(false)}>
          <img src={iconClose} />
        </button>
      </div>
      {listData.length > 1 && (
        <div className="slider-button">
        <div className="group-btn" onClick={() => handleGetIndex(false)}>
          <button>
            <img src={arrow} alt="arrow" />
          </button>
          <p>
            {currentIndex === 0
              ? listData[listData.length - 1].title
              : listData[currentIndex - 1].title}
          </p>
        </div>
        <div className="group-btn" onClick={() => handleGetIndex(true)}>
          <p>
            {currentIndex + 1 === listData.length
              ? listData[0].title
              : listData[currentIndex + 1].title}
          </p>
          <button>
            <img src={arrow} alt="arrow" />
          </button>
        </div>
      </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transition: "all 1s ease-in-out",
        }}
      >
        <h3
          className="preview-title"
          style={{
            cursor: "pointer",
            transform: "scale(1.7)",
            transition: "all 1s ease-in-out",
          }}
        >
          {currentAddress.title}
        </h3>
      </div>
    </div>
  );
}

export default ModalDetail;
