import React, { useEffect, useState } from "react";

function Line({ source, target, titleRef }) {
  const [position, setPosition] = useState("bottom-right");
  const [clientHeight, setClientHeigth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(0);
  const [style, setStyle] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (titleRef && titleRef.current) {
      setClientHeigth(titleRef.current.clientHeight);
      setClientWidth(titleRef.current.clientWidth);
    }
  }, [titleRef]);

  useEffect(() => {
    if (target.x > 0 && target.y > 0) {
      setPosition("bottom-right");
    }

    if (target.x > 0 && target.y < 0) {
      setPosition("top-right");
    }

    if (target.x < 0 && target.y > 0) {
      setPosition("bottom-left");
    }

    if (target.x < 0 && target.y < 0) {
      setPosition("top-left");
    }
  }, [target]);

  useEffect(() => {
    if (source && target) {
      const centerx = (source.x + target.x) / 2;
      const centery = (source.y + target.y) / 2;
      const lineHeigth = 1;
      const startHeight = 0;
      const width = Math.sqrt(
        Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2),
      );
      setAngle(
        (Math.atan2(source.y - target.y, source.x - target.x) * 180) / Math.PI,
      );
      setDistance(width);
      setStyle({
        top: centery - lineHeigth / 2 + startHeight / 2,
        left: centerx - width / 2 + startHeight / 2,
      });
    }
  }, [source, target]);

  return (
    <div
      className="line"
      style={{
        width:
          target.y < 40 && target.y > -40
            ? distance - clientWidth / 2
            : distance - (distance / 100) * 10,
        transform: `rotate(${angle}deg)`,
        top: `${style.top - (style.top / 100) * 10}px`,
        left: `${
          target.y < 40 && target.y > -40 && target.x < 0
            ? (distance - clientWidth / 2) * -1
            : style.left - (style.left / 100) * 10
        }px`,
      }}
    ></div>
  );
}

export default Line;
