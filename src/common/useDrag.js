import { useCallback, useEffect, useState } from "react";

export const useDrag = ({ ref, calculateFor = "topLeft" }) => {
  const [dragInfo, setDragInfo] = useState();
  const [finalPosition, setFinalPosition] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const updateFinalPosition = useCallback(
    (width, height, x, y) => {
      if (calculateFor === "bottomRight") {
        setFinalPosition({
          x: Math.max(
            Math.min(
              window.innerWidth - width,
              window.innerWidth - (x + width),
            ),
            0,
          ),
          y: Math.max(
            Math.min(
              window.innerHeight - height,
              window.innerHeight - (y + height),
            ),
            0,
          ),
        });

        return;
      }

      setFinalPosition({
        x: Math.min(Math.max(0, x), window.innerWidth - width),
        y: Math.min(Math.max(0, y), window.innerHeight - height),
      });
    },
    [calculateFor],
  );

  const handleMouseUp = (evt) => {
    evt.preventDefault();
    setIsDragging(false);
  };

  const handleMouseDown = (evt) => {
    evt.preventDefault();

    const { clientX, clientY } = evt;
    const { current: draggableElement } = ref;

    if (!draggableElement) {
      return;
    }

    const { width, height } =
      draggableElement.getBoundingClientRect();

      const { offsetTop, offsetLeft } = ref.current

    setIsDragging(true);
    setDragInfo({
      startX: clientX,
      startY: clientY,
      top: offsetTop,
      left: offsetLeft,
      width,
      height,
    });
  };

  const handleMouseMove = useCallback(
    (evt) => {
      const { current: draggableElement } = ref;

      if (!isDragging || !draggableElement) return;

      evt.preventDefault();

      const { clientX, clientY } = evt;

      const position = {
        x: dragInfo.startX - clientX,
        y: dragInfo.startY - clientY,
      };

      const { top, left, width, height } = dragInfo;

      updateFinalPosition(width, height, left - position.x, top - position.y);
    },
    [isDragging, dragInfo, ref, updateFinalPosition],
  );

  const recalculate = (width, height) => {
    const { current: draggableElement } = ref;
    const { offsetTop, offsetLeft } = ref.current
    const {
      width: boundingWidth,
      height: boundingHeight,
    } = draggableElement.getBoundingClientRect();

    updateFinalPosition(
      width ? boundingWidth : width,
      height ? boundingHeight : height,
      offsetLeft,
      offsetTop,
    );
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return {
    position: finalPosition,
    handleMouseDown,
    recalculate,
  };
};
