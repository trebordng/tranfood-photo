import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";


export default async function getBase64ImageUrl(image: string) {

  const response = await fetch(image);
  const buffer = await response.arrayBuffer();
  const minified = await imagemin.buffer(Buffer.from(buffer), {
    plugins: [imageminJpegtran()],
  });

  const url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
  return url;
}
