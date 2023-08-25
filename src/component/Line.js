import React, { useEffect, useState } from "react";

function Line({ source, target, titleRef }) {
  const [position, setPosition] = useState("bottom-right");
  const [clientHeight, setClientHeigth] = useState(38)
  const [clientWidth, setClientWidth] = useState(200)

  useEffect(() => {
    if(titleRef && titleRef.current) {
      setClientHeigth(titleRef.current.clientHeight)
      setClientWidth(titleRef.current.clientWidth)
    }
  }, [titleRef])

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

  return (
    <div>
      {/* top duong left duong */}
      {position === "bottom-right" && (
        <svg
          viewBox={`0 0 ${target.x} ${target.y < 40 ? 40 : target.y}`}
          width={`${target.x}`}
        >
          <defs>
            <marker
              id="circle"
              viewBox="0 0 4 4"
              refX="2"
              refY="2"
              markerWidth="4"
              markerHeight="4"
            >
              <circle cx="2" cy="2" r="2" fill="#FFFFFF" />
            </marker>
          </defs>
          <line
            id="l1"
            x1={source.x}
            y1={source.y}
            x2={target.y < 40 ? target.x - 10 : target.x}
            y2={target.y < 40 ? (target.y + clientHeight) / 2 : target.y}
            stroke="#FFFFFF"
          />
        </svg>
      )}

      {/* top am left duong */}
      {position === "top-right" && (
        <svg
          style={{
            transform: `translate(0px, ${target.y}px)`,
          }}
          viewBox={`0 ${target.y} ${target.x} ${
            target.y * -1 < 40 ? 40 : target.y * -1
          }`}
          width={`${target.x}`}
        >
          <defs>
            <marker
              id="circle"
              viewBox="0 0 4 4"
              refX="2"
              refY="2"
              markerWidth="4"
              markerHeight="4"
            >
              <circle cx="2" cy="2" r="2" />
            </marker>
          </defs>
          <line
            id="l1"
            x1={source.x}
            y1={source.y}
            x2={target.y > -40 ? target.x - 10 : target.x}
            y2={target.y > -40 ? (target.y + clientHeight) / 2 : target.y + clientHeight}
            stroke="#FFFFFF"
          />
        </svg>
      )}

      {/* top duong left am */}
      {position === "bottom-left" && (
        <svg
          style={{
            transform: `translate(${target.x}px, 0px)`,
          }}
          viewBox={`${target.x} 0 ${target.x * -1} ${
            target.y < 40 ? 40 : target.y
          }`}
          width={`${target.x * -1}`}
        >
          <defs>
            <marker
              id="circle"
              viewBox="0 0 4 4"
              refX="2"
              refY="2"
              markerWidth="4"
              markerHeight="4"
            >
              <circle cx="2" cy="2" r="2" />
            </marker>
          </defs>
          <line
            id="l1"
            x1={source.x}
            y1={source.y}
            x2={(target.y < 40 && target.x * -1 > clientWidth) ? target.x + clientWidth : target.y < 40 ? target.x / 2 :  target.x}
            y2={target.y < 40 ? (target.y + clientHeight) / 2 : target.y < 40 ? (target.y + target.y / 2) / 2 : target.y + target.y / 2}
            stroke="#FFFFFF"
          />
        </svg>
      )}

      {/* top am left am */}
      {position === "top-left" && (
        <svg
          style={{
            transform: `translate(${target.x}px, ${target.y}px)`,
          }}
          viewBox={`${target.x} ${target.y} ${target.x * -1} ${
            target.y * -1 < 40 ? 40 : target.y * -1
          }`}
          width={`${target.x * -1}`}
        >
          <defs>
            <marker
              id="circle"
              viewBox="0 0 4 4"
              refX="2"
              refY="2"
              markerWidth="4"
              markerHeight="4"
            >
              <circle cx="2" cy="2" r="2" />
            </marker>
          </defs>
          <line
            id="l1"
            x1={source.x}
            y1={source.y}
            x2={
              target.y > -40 ? target.x + clientWidth : target.x + (target.x / 4) * -1
            }
            y2={target.y > -40 ? (target.y + clientHeight) / 2 : target.y + clientHeight}
            stroke="#FFFFFF"
          />
        </svg>
      )}
    </div>
  );
}

export default Line;
