import { Injectable } from '@nestjs/common';
import { CreateDiscipleDto } from './dto/create-disciple.dto';
import { UpdateDiscipleDto } from './dto/update-disciple.dto';

@Injectable()
export class DisciplesService {
  create(createDiscipleDto: CreateDiscipleDto) {
    return 'This action adds a new disciple';
  }

  findAll() {
    return `This action returns all disciples`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disciple`;
  }

  update(id: number, updateDiscipleDto: UpdateDiscipleDto) {
    return `This action updates a #${id} disciple`;
  }

  remove(id: number) {
    return `This action removes a #${id} disciple`;
  }
}
