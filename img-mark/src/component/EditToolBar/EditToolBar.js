import React, { useState } from "react";
import Button from "../Button/Button";
import AddnewButton from "../AddnewButton/AddnewButton";
import AddedButton from "../AddedButton/AddedButton";

function EditToolBar() {
  const [isActive, setIsActive] = useState(1);

  const handleCheckActive = (value) => {
    setIsActive(value);
  };

  return (
    <div className="w-full px-5 py-4">
      <div className="w-full flex items-center justify-between">
        <div
          className={`w-1/2 text-center py-3 text-textTab ${
            isActive === 1 &&
            "border-b-[2px] border-buttonPreview !text-buttonPreview"
          }`}
        >
          <Button
            label="Thêm nút"
            className="text-sm not-italic font-medium leading-4"
            onClick={() => handleCheckActive(1)}
          />
        </div>
        <div
          className={`w-1/2 text-center py-3 text-textTab ${
            isActive === 2 &&
            "border-b-[2px] border-buttonPreview !text-buttonPreview"
          }`}
        >
          <Button
            label="Nút đã thêm"
            className="text-sm not-italic font-medium leading-4"
            onClick={() => handleCheckActive(2)}
          />
        </div>
      </div>
      <div className="w-full">{isActive === 1 && <AddnewButton />}</div>
      <div className="w-full">{isActive === 2 && <AddedButton />}</div>
    </div>
  );
}

export default EditToolBar;
