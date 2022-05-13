import * as fs from 'fs';
import { JEMAAT_PATH_FOLDER } from '../constants/image-path.constant';

export const deleteImage = (filePath: string) => {
  if (!filePath) throw new Error('file path is' + filePath);

  try {
    const getArray = filePath.split('/');
    const getImageFileName = getArray[getArray.length - 1];
    fs.unlinkSync('./' + JEMAAT_PATH_FOLDER + getImageFileName);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
