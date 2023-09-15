import React from "react";
import { IconClose, IconFullScreen } from "../../access/icons/Icons";

function HeaderBar() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full pt-sm pb-[5px] pl-5 pr-4">
        <div className="text-center text-base not-italic font-semibold leading-5 uppercase text-header">
          Image Map
        </div>
        <div className="flex justify-between items-center">
          <button className="p-space6">
            <IconFullScreen />
          </button>
          <button className="p-space6">
            <IconClose />
          </button>
        </div>
      </div>
      <div className="h-[5px]"></div>
    </div>
  );
}

export default HeaderBar;
