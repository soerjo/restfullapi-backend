import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { JemaatService } from './jemaat.service';
import { JemaatController } from './jemaat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JemaatRepository } from './jemaat.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([JemaatRepository]),
    MulterModule.register(),
  ],
  controllers: [JemaatController],
  providers: [
    JemaatService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class JemaatModule {}
