import { Module } from '@nestjs/common';
import { SundayServiceService } from './sunday_service.service';
import { SundayServiceController } from './sunday_service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SundayService } from './entities/sunday_service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SundayService])],
  controllers: [SundayServiceController],
  providers: [SundayServiceService],
})
export class SundayServiceModule {}
