import React from "react";
import { IconChecked, IconPreview, IconEmbed } from "../../access/icons/Icons";
import Button from "../Button/Button";

function FooterBar() {
  return (
    <div className="w-full shadow-footerBox mt-1 border-t border-borderTop">
      <div className="flex justify-between items-center w-full px-5 py-4">
        <div className="flex justify-center items-center">
          <i>
            <IconChecked />
          </i>
          <p className="text-sm not-italic font-normal leading-normal text-textBlack ml-1">
            Tự động lưu 16:00 15/06/023
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            label="Xem trước"
            type="both"
            icon={<IconPreview />}
            className="py-2 px-[10px] rounded border border-buttonPreview bg-white text-buttonPreview text-sm not-italic font-normal leading-normal w-[120px] cursor-pointer"
          />
          <Button
            label="Nhúng"
            type="both"
            icon={<IconEmbed />}
            className="py-2 px-[10px] rounded bg-buttonConfirm text-white text-sm not-italic font-normal leading-normal w-[120px] cursor-pointer"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default FooterBar;
