import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (req, file: Express.Multer.File, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException('Only image file are allowed!'),
      false,
    );
  }
  callback(null, true);
};
