import React, { useEffect, useState } from "react";

function Line({ source, target, setAddressTransform }) {
  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(0);
  const [style, setStyle] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (setAddressTransform) {
      if (target.x > 0 && target.y > 0) {
        if (target.x < 80) {
          setAddressTransform({
            x: -50,
            y: 0,
          });
        } else {
          setAddressTransform({
            x: 0,
            y: -50,
          });
        }
      }
  
      if (target.x > 0 && target.y < 0) {
        if (target.x > 80) {
          setAddressTransform({
            x: 0,
            y: -50,
          });
        } else {
          setAddressTransform({
            x: -50,
            y: -100,
          });
        }
      }
  
      if (target.x < 0 && target.y > 0) {
        if (target.y > 80) {
          setAddressTransform({
            x: -50,
            y: 0,
          });
        } else {
          setAddressTransform({
            x: -100,
            y: -50,
          });
        }
      }
  
      if (target.x < 0 && target.y < 0) {
        if (target.y < -80) {
          setAddressTransform({
            x: -50,
            y: -100,
          });
        } else {
          setAddressTransform({
            x: -100,
            y: -50,
          });
        }
      }
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
        width: distance,
        transform: `rotate(${angle}deg)`,
        top: `${style.top}px`,
        left: `${style.left}px`,
      }}
    ></div>
  );
}

export default Line;
