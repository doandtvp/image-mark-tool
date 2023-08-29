import React, { useEffect, useRef } from 'react';
import "./ModalConfirmDelete.css";

function ModalConfirmDelete(props) {
  const { confirmDeleteItem, setShowDeleteModal, showDeleteModal } = props
  const wrapperRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (showDeleteModal && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDeleteModal(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showDeleteModal])

  return (
    <div className={`data-form-delete ${showDeleteModal ? 'show-modal-deleted' : 'hide-modal-deleted'}`}>
      <div ref={wrapperRef} className='delete-modal-content'>
        <div className="data-fields">
          <h3>Bạn có muốn xóa địa điểm này khỏi danh sách đánh dấu?</h3>
        </div>
        <div className="btn-group">
          <button onClick={() => setShowDeleteModal(false)}>Hủy Bỏ</button>
          <button onClick={confirmDeleteItem}>Xác Nhận</button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmDelete