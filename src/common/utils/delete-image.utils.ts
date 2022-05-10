import * as fs from 'fs';
import { jemaatpathfolder } from '../constants/image-path.constant';

export const deleteImage = (filePath: string) => {
  if (!filePath) throw new Error('file path is' + filePath);

  try {
    const getArray = filePath.split('/');
    const getImageFileName = getArray[getArray.length - 1];
    fs.unlinkSync('./' + jemaatpathfolder + getImageFileName);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
