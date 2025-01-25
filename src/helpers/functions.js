export const isImage = (path) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const extension = path.split('.').pop().toLowerCase();
  return imageExtensions.includes(extension);
};

export const isVideo = (path) => {
  const videoExtensions = ['mp4', 'webm', 'ogg'];
  const extension = path.split('.').pop().toLowerCase();
  return videoExtensions.includes(extension);
};
