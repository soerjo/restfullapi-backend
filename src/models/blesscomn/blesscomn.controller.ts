import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserPayloadDto } from 'src/common/dto/user-payload.dto';
import { Roles } from 'src/common/interfaces';
import { BlesscomnService } from './blesscomn.service';
import { QueryReportDto } from './dto';
import { CreateBlesscomnDto } from './dto/create-blesscomn.dto';
import { UpdateBlesscomnDto } from './dto/update-blesscomn.dto';

@Controller('blesscomn')
export class BlesscomnController {
  user: UserPayloadDto = {
    role: [Roles.ADMIN],
    userid: '01',
    username: 'soerjo',
  };

  constructor(private readonly blesscomnService: BlesscomnService) {}

  @Post()
  create(@Body() createBlesscomnDto: CreateBlesscomnDto) {
    return this.blesscomnService.create(createBlesscomnDto);
  }

  @Get()
  findAll(@Query() query: QueryReportDto) {
    return this.blesscomnService.findAll(query, this.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blesscomnService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlesscomnDto: UpdateBlesscomnDto,
  ) {
    return this.blesscomnService.update(id, updateBlesscomnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blesscomnService.remove(id);
  }
}
