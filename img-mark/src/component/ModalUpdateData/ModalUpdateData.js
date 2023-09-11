import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./ModalUpdateData.css";
import { getVisibleDimensions } from "../../common/getVisibleDimensions";

function ModalUpdateData(props) {
  const {
    x,
    y,
    addressInfro,
    handleChange,
    handleCloseModal,
    isShowModal,
    isEdit,
    handleEdit,
    addToListData,
    editModalPos,
    imgRef,
  } = props;

  const [modalStyle, setModalStyle] = useState({});
  const wrapperRef = useRef();
  const rect = wrapperRef.current?.getBoundingClientRect() || {};

  useLayoutEffect(() => {
    const { visibleWidth, visibleHeight, top, left } =
      getVisibleDimensions(rect);
  }, [rect]);

  useEffect(() => {
    if (!isEdit) {
      setModalStyle({
        top: `${y > 32 ? "unset" : y + 2 + "%"}`,
        bottom: `${y > 32 ? 100 - y + 2 + "%" : "unset"}`,
        left: `${x > 75 ? "unset" : x + 1 + "%"}`,
        right: `${x > 75 ? 100 - x + 1 + "%" : "unset"}`,
        transition: "all 0.5s ease",
      });
    } else {
      setModalStyle({
        top: `${
          editModalPos.y + 420 > imgRef.current.clientHeight
            ? editModalPos.y -
              (editModalPos.y + 420 - imgRef.current.clientHeight) -
              50
            : editModalPos.y
        }px`,
        left: `${
          editModalPos.x + 400 > imgRef.current.clientWidth
            ? editModalPos.x -
              (editModalPos.x + 400 - imgRef.current.clientWidth) -
              50
            : editModalPos.x
        }px`,
        transition: "all 0.5s ease",
      });
    }
  }, [x, y, editModalPos, isEdit, imgRef]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isShowModal &&
        isEdit &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isEdit, isShowModal]);

  return (
    <div
      className={`data-form ${isShowModal ? "show-form" : "hide-form"}`}
      style={modalStyle}
      ref={wrapperRef}
    >
      <div className="data-fields">
        <h3 className="input-labels">Tiêu Đề</h3>
        <input
          className="address-input"
          type="text"
          name="title"
          value={addressInfro.title}
          autoFocus
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="data-fields">
        <h3 className="input-labels">Mô Tả</h3>
        <textarea
          className="description-input"
          value={addressInfro.description}
          onChange={(e) => handleChange(e)}
          name="description"
        ></textarea>
      </div>
      <div className="btn-group">
        <button className="cancel-button" onClick={handleCloseModal}>
          Hủy Bỏ
        </button>
        {isEdit ? (
          <button className="edit-button" onClick={handleEdit}>
            Chỉnh Sửa
          </button>
        ) : (
          <button className="save-button" onClick={addToListData}>
            Lưu Lại
          </button>
        )}
      </div>
    </div>
  );
}

export default ModalUpdateData;
