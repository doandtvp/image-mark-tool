import React, { useRef } from "react";
import "./AccordionItem.css";

function AccordionItem(props) {
  const contentEl = useRef({});
  const { handleToggle, active, item } = props;
  const { id, title, description, img } = item;

  return (
    <div className="accordion-card">
      <div className="accordion-header">
        <div
          className={`accordion-toggle p-3 ${active === id ? "active" : ""}`}
          onClick={() => handleToggle(id)}
        >
          <div className="accordion-title">
            <div className="modal-title-bound">
              {title.split(" ").length > 1 ? (
                <>
                  <span>{title.split(" ")[0]}</span>
                  <h3 className="modal-content-title">
                    {title.split(" ").slice(1).join(" ")}
                  </h3>
                </>
              ) : (
                <h3 className="modal-content-title">{title}</h3>
              )}
            </div>
          </div>
          <div className="map-section-collapse">
            <div
              className={`plus-minus-toggle ${
                active === id ? "" : "collapsed"
              }`}
            ></div>
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`collapse ${active === id ? "show" : ""}`}
        style={
          active === id
            ? { height: contentEl && contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="accordion-body">
          <div>
            <p
              className={
                description.length > 150
                  ? "modal-content-description"
                  : "modal-content-less-description"
              }
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;
