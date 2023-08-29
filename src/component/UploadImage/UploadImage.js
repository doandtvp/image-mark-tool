import React, { useState } from "react";
import img from "../../access/img/map-center-overflow.jpg";
import ModalUpdateData from "../ModalUpdateData/ModalUpdateData";
import AddressLabel from "../AddressLabel/AddressLabel";
import { Link } from "react-router-dom";
import "./UploadImage.css";
import ModalConfirmDelete from "../ModalConfirmDelete/ModalConfirmDelete";

function UploadImage() {
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const [currentId, setCurrentId] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [listDots, setListDots] = useState([]);
  const [file, setFile] = useState(localStorage.getItem("imageUrl") || '');
  const [listData, setListData] = useState(
    JSON.parse(localStorage.getItem("lists")) || [],
  );
  const [addressInfro, setAddressInfo] = useState({
    title: "",
    description: "",
  });

  const printCoordinates = (e) => {
    if (!isEdit) {
      const { width, height } = e.target.getBoundingClientRect();
      const { offsetX, offsetY } = e.nativeEvent;
      setX(Math.round((offsetX / width) * 100));
      setY(Math.round((offsetY / height) * 100));
      setIsShowModal(true);
      setListDots([
        {
          x: Math.round((offsetX / width) * 100),
          y: Math.round((offsetY / height) * 100),
        },
      ]);
    }
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
      id: Math.random(),
      x: x,
      y: y,
      title: addressInfro.title,
      description: addressInfro.description,
      addressPosititon: {
        x: x > 96 ? -200 : 60,
        y: y > 96 ? -200 : 60,
      },
      linePosition: {
        x: 0,
        y: -50
      }
    };

    setListData([...listData, newElement]);
    localStorage.setItem("lists", JSON.stringify([...listData, newElement]));
    setAddressInfo({
      title: "",
      description: "",
    });
    setIsShowModal(false);
  };

  const getEditItem = (item) => {
    setIsShowModal(true);
    setIsEdit(true);
    setListDots([]);
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
    localStorage.setItem("lists", JSON.stringify(newList));
    setIsEdit(false);
    setIsShowModal(false);
  };

  const deleteItem = (id, isShow) => {
    setCurrentId(id);
    setShowDeleteModal(isShow);
  };

  const confirmDeleteItem = () => {
    const newArr = listData.filter((item) => item.id !== currentId);
    setListData(newArr);
    localStorage.setItem("lists", JSON.stringify(newArr));
    setX(-1);
    setY(-1);
    setShowDeleteModal(false);
    setCurrentId(0);
  };

  const handleCloseModal = () => {
    if (isEdit) {
      setIsEdit(false);
    }
    setIsShowModal(false);
    setListDots([]);
    setAddressInfo({
      title: "",
      description: "",
    });
  };

  const changeHandler = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    localStorage.setItem("imageUrl", URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="upload-image">
      <div className="upload-title">
        <h1>Upload Image</h1>
        <Link to="/preview">
          <button>Preview</button>
        </Link>
      </div>
      <div className="upload-file-input">
        <input id="actual-btn" type="file" name="file" onChange={changeHandler} hidden />
        <label htmlFor="actual-btn">Chọn Ảnh</label>
      </div>
      <div className="image-content">
        <div className="image-bound">
          <img onClick={(e) => printCoordinates(e)} src={file || img} alt="abc" />
          {listDots &&
            listDots.length > 0 &&
            listDots.map((item, index) => (
              <div
                style={{
                  position: "absolute",
                  top: `${item.y}%`,
                  left: `${item.x}%`,
                }}
                key={index}
              >
                <div className="white-mark"></div>
              </div>
            ))}
          {listData && listData.length > 0 && (
            <React.Fragment>
              {listData.map((item) => (
                <AddressLabel
                  item={item}
                  editItem={getEditItem}
                  deleteItem={deleteItem}
                  listData={listData}
                  setListData={setListData}
                  key={item.id}
                />
              ))}
            </React.Fragment>
          )}
        </div>
        {isShowModal && (
          <ModalUpdateData
            x={x}
            y={y}
            addressInfro={addressInfro}
            handleChange={handleChange}
            handleCloseModal={handleCloseModal}
            isShowModal={isShowModal}
            isEdit={isEdit}
            handleEdit={handleEdit}
            addToListData={addToListData}
          />
        )}
        {showDeleteModal && (
          <ModalConfirmDelete
            confirmDeleteItem={confirmDeleteItem}
            setShowDeleteModal={setShowDeleteModal}
            showDeleteModal={showDeleteModal}
          />
        )}
      </div>
    </div>
  );
}

export default UploadImage;
