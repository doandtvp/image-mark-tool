import React, { useEffect, useRef, useState } from "react";
import "./ModalUpdateData.css";

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
    imgRef
  } = props;

  const [modalStyle, setModalStyle] = useState({});
  const wrapperRef = useRef();

  useEffect(() => {
    if (!isEdit) {
      setModalStyle({
        top: `${y > 57 ? "unset" : y + 2 + "%"}`,
        bottom: `${y > 57 ? 100 - y + 2 + "%" : "unset"}`,
        left: `${x > 78 ? "unset" : x + 1 + "%"}`,
        right: `${x > 78 ? 100 - x + 1 + "%" : "unset"}`,
        transition: "all 0.5s ease",
      });
    } else {
      setModalStyle({
        top: `${editModalPos.y + 420 > imgRef.current.clientHeight ? editModalPos.y - (editModalPos.y + 420 - imgRef.current.clientHeight) - 50 : editModalPos.y}px`,
        left: `${editModalPos.x + 400 > imgRef.current.clientWidth ? editModalPos.x - (editModalPos.x + 400 - imgRef.current.clientWidth) - 50 : editModalPos.x}px`,
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
        <h3>Tiêu Đề</h3>
        <input
          type="text"
          name="title"
          value={addressInfro.title}
          autoFocus
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="data-fields">
        <h3>Mô Tả</h3>
        <textarea
          value={addressInfro.description}
          onChange={(e) => handleChange(e)}
          name="description"
        ></textarea>
      </div>
      <div className="btn-group">
        <button onClick={handleCloseModal}>Hủy Bỏ</button>
        {isEdit ? (
          <button onClick={handleEdit}>Chỉnh Sửa</button>
        ) : (
          <button onClick={addToListData}>Lưu Lại</button>
        )}
      </div>
    </div>
  );
}

export default ModalUpdateData;
