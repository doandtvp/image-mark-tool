import React, { useState } from 'react';
import bottle from "../../access/img/botte.jpg";
import "./MobileList.css";
import AccordionItem from '../AccordionItem/AccordionItem';

function MobileList(props) {
  const { listData } = props;
  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
      if (active === index) {
          setActive(null);
      } else {
          setActive(index);
      }
  }

  return (
    <div className="preview-mobile">
      <div className='preview-mobile-content'>
        {listData && listData.length > 0 && listData.map((item) => (
          <div className='preview-mobile-item' key={item.id}>
            <img className="modal-mobile-img" src={bottle} alt="img" />
            <AccordionItem
              item={item}
              active={active}
              handleToggle={handleToggle}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileList