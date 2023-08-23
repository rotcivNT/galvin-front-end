export const mergeColorProducts = (gallery: any[]) => {
  const galleryByColor: any = {};
  gallery.forEach((item) => {
    const colorID = item.colorID;
    if (galleryByColor[colorID]) {
      galleryByColor[colorID].push(item);
    } else {
      galleryByColor[colorID] = [item];
    }
  });

  return Object.values(galleryByColor);
};
