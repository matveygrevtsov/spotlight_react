export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img: HTMLImageElement = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (err: string | Event) => reject(err);
  });

export const loadImages = async (arrayOfSrc: string[] | undefined): Promise<HTMLImageElement[]> => {
  if (!arrayOfSrc || arrayOfSrc.length === 0) {
    return [];
  }
  return Promise.all(arrayOfSrc.map(loadImage));
};