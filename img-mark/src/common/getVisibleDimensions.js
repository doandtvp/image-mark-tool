export const getVisibleDimensions = (rect) => {
  const width = rect.width;
  const height = rect.height;

  const top = rect.top;
  const left = rect.left;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let visibleWidth = width;
  let visibleHeight = height;

  if (top < 0) {
    visibleHeight += top;
  }

  if (left < 0) {
    visibleWidth += left;
  }

  if (top + height > viewportHeight) {
    visibleHeight -= top + height - viewportHeight;
  }

  if (left + width > viewportWidth) {
    visibleWidth -= left + width - viewportWidth;
  }
  if (visibleHeight < 0) {
    visibleHeight = 0;
  }
  if (visibleWidth < 0) {
    visibleWidth = 0;
  }
  return { visibleWidth, visibleHeight, top, left };
};
