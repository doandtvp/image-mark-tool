import React, { useEffect, useState } from "react";
import IconClose from "../../access/icons/icon-close.svg";
import bottle from "../../access/img/botte.jpg";
import arrow from "../../access/icons/icon-arrow.png";
import "./ModalDetail.css";
import Line from "../Line";
import {
  maxPercentBound,
  minPercentBound,
  pointZoomPositionLeft,
  pointZoomPositionLeftMax,
  pointZoomPositionTop,
  pointZoomPositionTopMax,
} from "../../common/variable";

function ModalDetail({
  currentAddress,
  setCurrentAddress,
  listData,
  setIsShowModal,
  setZoom,
  setImageStyle,
  selectAddress,
  setIsDisplay,
}) {
  const currentIndex = listData.findIndex((x) => x.id === currentAddress.id);
  const checkCondition =
    currentAddress.x > minPercentBound &&
    currentAddress.x < maxPercentBound &&
    currentAddress.y > minPercentBound &&
    currentAddress.y < maxPercentBound;
  const [addressTransform, setAddressTransform] = useState({
    x: 0,
    y: -50,
  });

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
                    <span className="address-split">
                      {currentAddress.title.split(" ")[0]}
                    </span>
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
          <IconClose />
        </button>
      </div>
      {listData.length > 1 && (
        <div className="slider-button">
          <div className="group-btn" onClick={() => handleGetIndex(false)}>
            <button className="button-wrapper">
              <img className="prev-arrow" src={arrow} alt="arrow" />
            </button>
            <p className="slider-title">
              {currentIndex === 0
                ? listData[listData.length - 1].title
                : listData[currentIndex - 1].title}
            </p>
          </div>
          <div className="group-btn" onClick={() => handleGetIndex(true)}>
            <p className="slider-title">
              {currentIndex + 1 === listData.length
                ? listData[0].title
                : listData[currentIndex + 1].title}
            </p>
            <button className="button-wrapper">
              <img className="next-arrow" src={arrow} alt="arrow" />
            </button>
          </div>
        </div>
      )}

      <div
        className="modal-mark"
        style={{
          top: `${
            checkCondition ? pointZoomPositionTop : pointZoomPositionTopMax
          }%`,
          left: `${
            checkCondition ? pointZoomPositionLeft : pointZoomPositionLeftMax
          }%`,
        }}
      >
        <div>
          <div className="white-mark"></div>
          <Line
            source={{ x: 0, y: 0 }}
            target={currentAddress.addressPosititon}
            setAddressTransform={setAddressTransform}
          />
          <h3
            className="preview-title"
            style={{
              top: currentAddress.addressPosititon.y,
              left: currentAddress.addressPosititon.x,
              transform: `translate(${addressTransform.x}%, ${addressTransform.y}%)`,
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
