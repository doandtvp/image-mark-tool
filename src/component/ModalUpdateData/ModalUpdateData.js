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
        <h3>Title</h3>
        <input
          type="text"
          name="title"
          value={addressInfro.title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="data-fields">
        <h3>Description</h3>
        <textarea
          value={addressInfro.description}
          onChange={(e) => handleChange(e)}
          name="description"
        ></textarea>
      </div>
      <div className="btn-group">
        <button onClick={handleCloseModal}>Cancel</button>
        {isEdit ? (
          <button onClick={handleEdit}>Edit Data</button>
        ) : (
          <button onClick={addToListData}>Save Data</button>
        )}
      </div>
    </div>
  );
}

export default ModalUpdateData;
