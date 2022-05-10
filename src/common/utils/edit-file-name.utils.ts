import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const editFilename = (req, file: Express.Multer.File, callback) => {
  const fileName = uuidv4();
  const fileExtName = path.parse(file.originalname).ext;

  callback(null, `${fileName.toLowerCase()}${fileExtName}`);
};
