import React, { useRef, useState } from "react";
import { useDrag } from "../common/useDrag";

function AddressLabel({ item, editItem, deleteItem }) {
  const draggableRef = useRef(null);
  const { position, handleMouseDown } = useDrag({
    ref: draggableRef
  });

  console.log({draggableRef})

  return (
    <div
      style={{
        position: "absolute",
        top: `${item.y}%`,
        left: `${item.x}%`,
      }}
    >
      <div className="address-label"
        ref={draggableRef}
        onMouseDown={handleMouseDown}
        style={{
          top: position.y,
          left: position.x
        }}
      >
        <h3 className="title">{item.title}</h3>
        <div className="btn-group">
          {/* <div className="edit-btn">
            <button onClick={() => editItem(item)}>Preview</button>
          </div> */}
          <div className="edit-btn">
            <button onClick={() => editItem(item)}>Edit</button>
          </div>
          <div className="delete-btn">
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      </div>
      <div className="dot"></div>
    </div>
  );
}

export default AddressLabel;
