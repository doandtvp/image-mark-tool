import React, { useState } from "react";
import img from "../access/img/map-center-overflow.jpg";
import ModalUpdateData from "./ModalUpdateData";
import AddressLabel from "./AddressLabel";
import { Link } from "react-router-dom";

function UploadImage() {
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addressInfro, setAddressInfo] = useState({
    title: "",
    description: "",
  });
  const [currentItem, setCurrentItem] = useState({});
  const [listData, setListData] = useState(JSON.parse(localStorage.getItem('lists')) || []);

  const printCoordinates = (e) => {
    const { width, height } = e.target.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;
    setX(Math.round((offsetX / width) * 100));
    setY(Math.round((offsetY / height) * 100));
    setIsShowModal(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddressInfo({
      ...addressInfro,
      [name]: value,
    });
  };

  const addToListData = () => {
    const newElement = {
      id: listData && listData.length + 1,
      x: x,
      y: y,
      title: addressInfro.title,
      description: addressInfro.description,
    };

    setListData([...listData, newElement]);
    localStorage.setItem('lists', JSON.stringify([...listData, newElement]))
    setAddressInfo({
      title: "",
      description: "",
    });
    setIsShowModal(false);
  };

  const getEditItem = (item) => {
    setIsShowModal(true);
    setIsEdit(true);
    setX(item.x);
    setY(item.y);
    setAddressInfo({
      title: item.title,
      description: item.description,
    });
    setCurrentItem(item);
  };

  const handleEdit = () => {
    const newList = listData.map((item) =>
      currentItem.id === item.id
        ? {
            ...item,
            title: addressInfro.title,
            description: addressInfro.description,
          }
        : item,
    );
    setAddressInfo({
      title: "",
      description: "",
    });
    setListData(newList);
    localStorage.setItem('lists', JSON.stringify(newList))
    setIsEdit(false);
    setIsShowModal(false);
  };

  const deleteItem = (id) => {
    const newArr = listData.filter((item) => item.id !== id);
    setListData(newArr);
    localStorage.setItem('lists', JSON.stringify(newArr))
    setX(-1);
    setY(-1);
  };

  const handleCloseModal = () => {
    if (isEdit) {
      setIsEdit(false);
    }
    setIsShowModal(false);
    setAddressInfo({
      title: "",
      description: "",
    });
  };

  return (
    <div className="upload-image">
      <div className="upload-title">
        <h1>Upload Image</h1>
        {x}:{y}
        <Link to='/preview'>
          <button>Preview</button>
        </Link>
      </div>
      <div className="image-content"
      >
        <div className="image-bound">
          <img onClick={(e) => printCoordinates(e)} src={img} alt="abc" />
          {listData && listData.length > 0 ? (
            <React.Fragment>
              {listData.map((item) => (
                <AddressLabel
                  item={item}
                  editItem={getEditItem}
                  deleteItem={deleteItem}
                />
              ))}
            </React.Fragment>
          ) : (
            <div
              className="dot"
              style={{
                position: "absolute",
                top: `${y}%`,
                left: `${x}%`,
              }}
            ></div>
          )}
        </div>
        {isShowModal && (
          <ModalUpdateData
            x={x}
            y={y}
            addressInfro={addressInfro}
            handleChange={handleChange}
            handleCloseModal={handleCloseModal}
            isEdit={isEdit}
            handleEdit={handleEdit}
            addToListData={addToListData}
          />
        )}
      </div>
    </div>
  );
}

export default UploadImage;
