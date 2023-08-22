import React, { useEffect, useRef } from "react";
import { useDrag } from "../../common/useDrag";
import "./AddressLabel.css";

function AddressLabel({ item, editItem, deleteItem, listData, setListData }) {
  const draggableRef = useRef(null);
  const { position, handleMouseDown } = useDrag({
    ref: draggableRef
  });

  useEffect(() => {
    if (position.x && position.y) {
      const newList = listData.map((location) => {
        if (location.id === item.id) {
          location.addressPosititon = {
            x: position.x,
            y: position.y
          }
        }
        return location
      })
  
      setListData(newList);
      localStorage.setItem('lists', JSON.stringify(newList))
    }
  },[position])

  const handleDrag = (e) => {
    handleMouseDown(e)
  }

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
        onMouseDown={(e) => handleDrag(e)}
        style={{
          top: item.addressPosititon.y,
          left: item.addressPosititon.x
        }}
      >
        <h3 className="title">{item.title}</h3>
        <div className="btn-group">
          <div className="edit-btn">
            <button onClick={() => editItem(item)}>Chỉnh Sửa</button>
          </div>
          <div className="delete-btn">
            <button onClick={() => deleteItem(item.id)}>Xóa</button>
          </div>
        </div>
      </div>
      <div className="dot"></div>
    </div>
  );
}

export default AddressLabel;
