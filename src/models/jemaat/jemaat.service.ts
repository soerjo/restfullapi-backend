import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROOT_IMAGE_URL } from 'src/common/constants/image-path.constant';
import {
  PageOptionDto,
  QueryPaginateDto,
  SearchQueryDto,
} from 'src/common/dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { deleteImage } from 'src/common/utils/delete-image.utils';
import { resizeFile } from 'src/common/utils/resize-file.util';
import { Repository } from 'typeorm';
import { Blesscomn } from '../blesscomn/entities/blesscomn.entity';
import { CreateJemaatDto } from './dto/create-jemaat.dto';
import { UpdateJemaatDto } from './dto/update-jemaat.dto';
import { JemaatRepository } from './jemaat.repository';

@Injectable()
export class JemaatService {
  constructor(
    @InjectRepository(Blesscomn)
    private blesscomnRepo: Repository<Blesscomn>,
    private jemaatRepo: JemaatRepository,
  ) {}

  async create(createJemaatDto: CreateJemaatDto, image: Express.Multer.File) {
    const { nama_lengkap: name } = createJemaatDto;
    const { blesscomn, ...res } = createJemaatDto;
    const getJemaat = await this.jemaatRepo.findOne({ nama_lengkap: name });
    if (getJemaat) throw new BadRequestException(`jemaat ${name} has registed`);

    const createdata = this.jemaatRepo.create({
      ...res,
    });

    if (blesscomn) {
      const getBlesscomn = await this.blesscomnRepo.findOne({
        nama_blesscomn: blesscomn,
      });
      if (getBlesscomn)
        throw new BadRequestException(`blesscomn ${blesscomn} is not found`);
      createdata.blesscomn = getBlesscomn;
    }

    if (image) {
      const defaultImagePath = await resizeFile(image, name, 200);
      const smallImagePath = await resizeFile(image, name, 100);
      createdata.defaultImage = ROOT_IMAGE_URL + defaultImagePath;
      createdata.smallImage = ROOT_IMAGE_URL + smallImagePath;
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
    const { blesscomn, ...res } = updateJemaatDto;
    const getJemaat = await this.jemaatRepo.findOne(id);
    if (!getJemaat) throw new BadRequestException(`data jemaat is not found`);
    const { nama_lengkap: name } = getJemaat;

    const createdata = this.jemaatRepo.create({
      ...getJemaat,
      ...res,
    });

    if (blesscomn) {
      const getBlesscomn = await this.blesscomnRepo.findOne({
        nama_blesscomn: blesscomn,
      });
      if (getBlesscomn)
        throw new BadRequestException(`blesscomn ${blesscomn} is not found`);
      createdata.blesscomn = getBlesscomn;
    }

    if (image) {
      const defaultImagePath = await resizeFile(image, name, 200);
      const smallImagePath = await resizeFile(image, name, 100);
      createdata.defaultImage = ROOT_IMAGE_URL + defaultImagePath;
      createdata.smallImage = ROOT_IMAGE_URL + smallImagePath;
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
