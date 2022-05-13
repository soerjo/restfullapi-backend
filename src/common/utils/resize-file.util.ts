import * as sharp from 'sharp';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { JEMAAT_PATH_FOLDER } from '../constants/image-path.constant';

export async function resizeFile(
  image: Express.Multer.File,
  filename = 'default',
  size = 100,
) {
  const getFileName = filename.replace(/ /g, '_');
  const getExtention = path.parse(image.originalname).ext;
  const fileName = `size:${size}` + getFileName + uuidv4() + getExtention;
  try {
    await sharp(image.buffer)
      .resize({
        width: size,
        fit: sharp.fit.contain,
      })
      .jpeg({ quality: 100 })
      .toFile('./' + JEMAAT_PATH_FOLDER + fileName);

    return fileName;
  } catch (error) {
    throw new Error(error.message);
  }
}
