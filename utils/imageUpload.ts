import imageCompression from "browser-image-compression";
import GetBase64 from "./getBase64";

export const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/dsnth7hww/upload";

export const reduceImageSize = async (imageFile: any) => {
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    fileType: "image/jpeg",
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    let base64 = await GetBase64(compressedFile); // write your own logic
    return base64;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (imageFile: any) => {
  let base64Img = await reduceImageSize(imageFile);
  let fileImage = {
    file: base64Img,
    upload_preset: "xrhxqiwj",
    multiple: true,
  };

  let response = await fetch(CLOUDINARY_URL, {
    body: JSON.stringify(fileImage),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const file = await response.json();

  console.log(file);
};
