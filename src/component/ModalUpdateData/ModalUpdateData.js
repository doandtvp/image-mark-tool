import React from "react";
import "./ModalUpdateData.css";

function ModalUpdateData(props) {

	const {
		x,
		y,
		addressInfro,
		handleChange,
		handleCloseModal,
		isEdit,
		handleEdit,
		addToListData
	} = props

  return (
    <div
      className="data-form"
      style={{
        top: `${y + 2}%`,
        left: `${x + 1}%`,
      }}
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
