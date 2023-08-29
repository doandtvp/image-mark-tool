import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "../../common/useDrag";
import "./AddressLabel.css";
import Line from "../Line";

function AddressLabel({ item, editItem, deleteItem, listData, setListData }) {
  const [showControl, setShowControl] = useState(false);
  const [addressTransform, setAddressTransform] = useState({
    x: 0,
    y: -50,
  });
  const draggableRef = useRef(null);
  const { position, handleMouseDown } = useDrag({
    ref: draggableRef,
  });

  useEffect(() => {
    if (position.x && position.y) {
      const newList = listData.map((location) => {
        if (location.id === item.id) {
          location.addressPosititon = {
            x: position.x,
            y: position.y,
          };
          location.linePosition = {
            x: addressTransform.x,
            y: addressTransform.y,
          };
        }
        return location;
      });

      setListData(newList);
      localStorage.setItem("lists", JSON.stringify(newList));
    }
  }, [position]);

  const handleDrag = (e) => {
    handleMouseDown(e);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${item.y}%`,
        left: `${item.x}%`,
        width: 0,
        height: 0,
      }}
    >
      <div
        className="address-label"
        ref={draggableRef}
        onMouseDown={(e) => handleDrag(e)}
        style={{
          top: item.addressPosititon.y,
          left: item.addressPosititon.x,
          transform: `translate(${addressTransform.x}%, ${addressTransform.y}%)`,
        }}
        onMouseOver={() => setShowControl(true)}
        onMouseLeave={() => setShowControl(false)}
      >
        <div className="title">
          <h3>{item.title}</h3>
          {showControl && (
            <div className="btn-group">
              <div className="edit-btn">
                <button onClick={() => editItem(item)}>Chỉnh Sửa</button>
              </div>
              <div className="delete-btn">
                <button onClick={() => deleteItem(item.id, true)}>Xóa</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Line
        source={{ x: 0, y: 0 }}
        target={item.addressPosititon}
        setAddressTransform={setAddressTransform}
      />
      <div className="white-mark"></div>
    </div>
  );
}

export default AddressLabel;
