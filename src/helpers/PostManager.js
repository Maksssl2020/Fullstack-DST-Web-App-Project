export const decodeImageFile = (imageFile) => {
  const byteCharacters = atob(imageFile);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArr = new Uint8Array(byteNumbers);
  return new Blob([byteArr], { type: "image/png" });
};
