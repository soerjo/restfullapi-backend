import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { JemaatService } from './jemaat.service';
import { JemaatController } from './jemaat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JemaatRepository } from './jemaat.repository';
import { MulterModule } from '@nestjs/platform-express';
import { Blesscomn } from '../blesscomn/entities/blesscomn.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JemaatRepository, Blesscomn]),
    MulterModule.register(),
  ],
  controllers: [JemaatController],
  providers: [JemaatService],
})
export class JemaatModule {}
