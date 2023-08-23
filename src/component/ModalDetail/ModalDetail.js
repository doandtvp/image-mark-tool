import React, { useEffect } from "react";
import iconClose from "../../access/icons/icon-close.svg";
import bottle from "../../access/img/botte.jpg";
import arrow from "../../access/icons/icon-arrow.png";
import "./ModalDetail.css";
import Line from "../Line";

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
  const checkCondition = currentAddress.x > 20 && currentAddress.x < 80 && currentAddress.y > 20 && currentAddress.y < 80

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

  //default 50 50, top 45 left 74, transition -16 -6, scale 3

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
              <p
                className={
                  currentAddress.description.length > 150
                    ? "modal-content-description"
                    : "modal-content-less-description"
                }
              >
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
          top: `${checkCondition ? 45 : 28}%`,
          left: `${checkCondition ? 74 : 77}%`,
          transition: "all 1s ease-in-out",
          width: "100%",
        }}
      >
        <div>
          <div className="white-mark"></div>
          <Line
            source={{ x: 0, y: 0 }}
            target={currentAddress.addressPosititon}
            pointSize={7}
          />
          <h3
            className="preview-title"
            style={{
              cursor: "pointer",
              top: currentAddress.addressPosititon.y,
              left: currentAddress.addressPosititon.x,
            }}
          >
            {currentAddress.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ModalDetail;
