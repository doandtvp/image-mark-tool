import React from "react";

function Button(props) {
  const { label, className, type = "normal", icon } = props;
  return (
    <React.Fragment>
      {type === "normal" && (
        <button className={className} {...props}>
          {label}
        </button>
      )}
      {type === "both" && (
        <div
          {...props}
          className={` flex items-center justify-center ${className}`}
        >
          <i>{icon}</i>
          <button className="ml-2">{label}</button>
        </div>
      )}
      {type === "icon" && (
        <button className={className} {...props}>
          {icon}
        </button>
      )}
    </React.Fragment>
  );
}

export default Button;
