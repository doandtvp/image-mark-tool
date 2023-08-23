import React from 'react';
import "./ModalConfirmDelete.css";

function ModalConfirmDelete(props) {
  const { confirmDeleteItem, setShowDeleteModal } = props

  return (
    <div className="data-form-delete">
      <div className='delete-modal-content'>
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