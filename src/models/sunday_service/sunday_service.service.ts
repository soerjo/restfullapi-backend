import { Injectable } from '@nestjs/common';
import { CreateSundayServiceDto } from './dto/create-sunday_service.dto';
import { UpdateSundayServiceDto } from './dto/update-sunday_service.dto';

@Injectable()
export class SundayServiceService {
  create(createSundayServiceDto: CreateSundayServiceDto) {
    return 'This action adds a new sundayService';
  }

  findAll() {
    return `This action returns all sundayService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sundayService`;
  }

  update(id: number, updateSundayServiceDto: UpdateSundayServiceDto) {
    return `This action updates a #${id} sundayService`;
  }

  remove(id: number) {
    return `This action removes a #${id} sundayService`;
  }
}
