export function useZoom(event) {
  var img = event.target;
  var posX = event.clientX;
  var posY = event.clientY;

  // calculate the zoom scale based on the image size and mouse position
  var scale = Math.min(img.width, img.height) / 2;

  // adjust the image position based on the mouse click
  var offsetX = posX - (img.offsetLeft + img.width / 2);
  var offsetY = posY - (img.offsetTop + img.height / 2);

  // apply the transform style to zoom and adjust the image
  img.style.transform = `translate(${-offsetX}px,${-offsetY}px) scale(${scale})`;
}
