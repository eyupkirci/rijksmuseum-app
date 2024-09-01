export const ImageToAverageColor = (src: string) => {
  const img = new Image();
  img.src = src;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  return new Promise((resolve, reject) => {
    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      let rgba = [0, 0, 0, 0];

      imageData.data.forEach((v, i) => {
        rgba[i % 4] = rgba[i % 4] + v;
      });
      const r = rgba[0] / (img.width * img.height);
      const g = rgba[1] / (img.width * img.height);
      const b = rgba[2] / (img.width * img.height);
      resolve([r, g, b]);
    };
    img.onerror = (e) => reject(e);
  });
};

export const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (val: number) => {
    const hex = Math.round(val).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
