import { BadRequestException, Injectable } from '@nestjs/common';
import { rootimageurl } from 'src/common/constants/image-path.constant';
import {
  PageOptionDto,
  QueryPaginateDto,
  SearchQueryDto,
} from 'src/common/dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { deleteImage } from 'src/common/utils/delete-image.utils';
import { resizeFile } from 'src/common/utils/resize-file.util';
import { CreateJemaatDto } from './dto/create-jemaat.dto';
import { UpdateJemaatDto } from './dto/update-jemaat.dto';
import { JemaatRepository } from './jemaat.repository';

@Injectable()
export class JemaatService {
  constructor(private jemaatRepo: JemaatRepository) {}

  async create(createJemaatDto: CreateJemaatDto, image: Express.Multer.File) {
    const { nama_lengkap: name } = createJemaatDto;
    const getJemaat = await this.jemaatRepo.findOne({ nama_panggilan: name });
    if (getJemaat) throw new BadRequestException(`jemaat ${name} has registed`);

    const createdata = this.jemaatRepo.create(createJemaatDto);

    if (image) {
      const defaultImagePath = await resizeFile(image, name, 200);
      const smallImagePath = await resizeFile(image, name, 100);
      createdata.defaultImage = rootimageurl + defaultImagePath;
      createdata.smallImage = rootimageurl + smallImagePath;
    }

    const data = await this.jemaatRepo.save(createdata);
    return new ResponseDto({ data });
  }

  async findAll(query: QueryPaginateDto) {
    const data = await this.jemaatRepo.pagination(
      query as PageOptionDto,
      query as SearchQueryDto,
    );
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.jemaatRepo.findOne(id);
    return new ResponseDto({ data });
  }

  async update(
    id: string,
    updateJemaatDto: UpdateJemaatDto,
    image: Express.Multer.File,
  ) {
    const getJemaat = await this.jemaatRepo.findOne(id);
    const { nama_lengkap: name } = getJemaat;
    if (!getJemaat) throw new BadRequestException(`data jemaat is not found`);

    const createdata = this.jemaatRepo.create({
      ...getJemaat,
      ...updateJemaatDto,
    });

    if (image) {
      const defaultImagePath = await resizeFile(image, name, 200);
      const smallImagePath = await resizeFile(image, name, 100);
      createdata.defaultImage = rootimageurl + defaultImagePath;
      createdata.smallImage = rootimageurl + smallImagePath;
    }

    const data = await this.jemaatRepo.save(createdata);

    if (getJemaat.defaultImage) deleteImage(getJemaat.defaultImage);
    if (getJemaat.smallImage) deleteImage(getJemaat.smallImage);

    return new ResponseDto({ data });
  }

  async remove(id: string) {
    const getJemaat = await this.jemaatRepo.findOne(id);
    if (!getJemaat) throw new BadRequestException(`data jemaat is not found`);
    await this.jemaatRepo.remove(getJemaat);
    if (getJemaat.defaultImage) deleteImage(getJemaat.defaultImage);

    return new ResponseDto({
      message: `jemaat ${getJemaat.nama_lengkap} success deleted!`,
    });
  }
}
