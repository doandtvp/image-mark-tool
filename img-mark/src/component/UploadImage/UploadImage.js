import React, { useContext, useEffect, useRef, useState } from "react";
import ModalUpdateData from "../ModalUpdateData/ModalUpdateData";
import AddressLabel from "../AddressLabel/AddressLabel";
import "./UploadImage.css";
import ModalConfirmDelete from "../ModalConfirmDelete/ModalConfirmDelete";
import { MyContext } from "../../ContextProvider";

function UploadImage({ setToggleTab }) {
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const [currentId, setCurrentId] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [listDots, setListDots] = useState([]);
  const { listDataMap, setListDataMap, file, unMountApp, defaultProps } =
    useContext(MyContext);
  const [editModalPos, setEditModalPos] = useState({
    x: 0,
    y: 0,
  });
  const imgRef = useRef();
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
        x: -50,
        y: 0,
      },
    };

    setListDataMap([...listDataMap, newElement]);
    setAddressInfo({
      title: "",
      description: "",
    });
    setIsShowModal(false);
  };

  const getEditItem = (item) => {
    const spaceTop =
      (imgRef.current.clientHeight / 100) * item.y +
      2 +
      item.addressPosititon.y;
    const spaceLeft =
      (imgRef.current.clientWidth / 100) * item.x + 1 + item.addressPosititon.x;
    setEditModalPos({
      x: Math.round(spaceLeft),
      y: Math.round(spaceTop),
    });

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
    const newList = listDataMap.map((item) =>
      currentItem.id === item.id
        ? {
            ...item,
            title: addressInfro.title,
            description: addressInfro.description,
          }
        : item
    );
    setAddressInfo({
      title: "",
      description: "",
    });
    setListDataMap(newList);
    setIsEdit(false);
    setIsShowModal(false);
  };

  const deleteItem = (id, isShow) => {
    setCurrentId(id);
    setShowDeleteModal(isShow);
  };

  const confirmDeleteItem = () => {
    const newArr = listDataMap.filter((item) => item.id !== currentId);
    setListDataMap(newArr);
    setX(-1);
    setY(-1);
    setShowDeleteModal(false);
    setIsShowModal(false);
    setCurrentId(0);
    setListDots([]);
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

  const handleSaveLocal = () => {
    defaultProps.getListAddressMark(listDataMap);
    unMountApp();
  };

  const handleCloseApp = () => {
    unMountApp();
  };

  return (
    <div className="upload-image">
      <div className="upload-title upload-title-edit">
        <div className="upload-file-input">
          <button className="preview-btn" onClick={() => setToggleTab(false)}>
            Xem Trước
          </button>
          <button
            className="save-all-button can-save"
            onClick={handleSaveLocal}
          >
            Lưu lại
          </button>
        </div>
        <button onClick={handleCloseApp}>Đóng</button>
      </div>

      <div className="image-content">
        <div className="image-bound">
          <img
            className="image-show"
            ref={imgRef}
            onClick={(e) => printCoordinates(e)}
            src={file}
            alt="input-img"
          />
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
          {listDataMap && listDataMap.length > 0 && (
            <React.Fragment>
              {listDataMap.map((item) => (
                <AddressLabel
                  item={item}
                  editItem={getEditItem}
                  deleteItem={deleteItem}
                  key={item.id}
                />
              ))}
            </React.Fragment>
          )}
        </div>
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
          editModalPos={editModalPos}
          imgRef={imgRef}
        />
        <ModalConfirmDelete
          confirmDeleteItem={confirmDeleteItem}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
        />
      </div>
    </div>
  );
}

export default UploadImage;
