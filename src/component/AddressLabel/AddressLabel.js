import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "../../common/useDrag";
import "./AddressLabel.css";
import Line from "../Line";

function AddressLabel({ item, editItem, deleteItem, listData, setListData }) {
  const [showControl, setShowControl] = useState(false)
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
        onMouseOver={()=>setShowControl(true)}
      onMouseLeave={()=>setShowControl(false)}
      >
        <h3 
          className="title"
        >
          {item.title}
        </h3>
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
      <Line
        source={{x:0, y:0}}
        target={item.addressPosititon}
        pointSize={7}
      />
      <div className="white-mark"></div>
    </div>
  );
}

export default AddressLabel;
