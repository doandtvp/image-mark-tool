export function getAspectRatio(image) {
  const w = image.naturalWidth;
  const h = image.naturalHeight;

  let aspectRatio = w / h;
  return aspectRatio;
}
