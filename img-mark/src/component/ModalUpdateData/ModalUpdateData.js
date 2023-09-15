import React, { useEffect, useRef, useState } from "react";
import "./ModalUpdateData.css";
import { maxPercentHeigth, maxPercentWith } from "../../common/variable";
import { useFocus } from "../../common/useFocus";

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
  const [inputRef, setInputFocus] = useFocus();

  useEffect(() => {
    if (isShowModal && x && y) {
      setInputFocus();
    }
  }, [isShowModal, x, y]);

  useEffect(() => {
    if (!isEdit) {
      setModalStyle({
        top: `${y > maxPercentWith ? "unset" : y + 2 + "%"}`,
        bottom: `${y > maxPercentWith ? 100 - y + 2 + "%" : "unset"}`,
        left: `${x > maxPercentHeigth ? "unset" : x + 1 + "%"}`,
        right: `${x > maxPercentHeigth ? 100 - x + 1 + "%" : "unset"}`,
      });
    } else {
      setModalStyle({
        top: `${
          editModalPos.y + wrapperRef.current.clientHeight >
          imgRef.current.clientHeight
            ? editModalPos.y -
              (editModalPos.y +
                wrapperRef.current.clientHeight -
                imgRef.current.clientHeight) -
              50
            : editModalPos.y
        }px`,
        left: `${
          editModalPos.x + wrapperRef.current.clientWidth >
          imgRef.current.clientWidth
            ? editModalPos.x -
              (editModalPos.x +
                wrapperRef.current.clientWidth -
                imgRef.current.clientWidth) -
              50
            : editModalPos.x
        }px`,
      });
    }
  }, [x, y, editModalPos, isEdit, imgRef, wrapperRef]);

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
        <h3 className="input-labels text-3xl">Tiêu Đề</h3>
        <input
          className="address-input"
          type="text"
          name="title"
          value={addressInfro.title}
          ref={inputRef}
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
