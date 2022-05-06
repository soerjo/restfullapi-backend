import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './provider/database/provider.module';
import { JemaatModule } from './models/jemaat/jemaat.module';
import { DisciplesModule } from './models/disciples/disciples.module';
import { BaptisModule } from './models/baptis/baptis.module';
import { SundayServiceModule } from './models/sunday_service/sunday_service.module';
import { SchedulesEventModule } from './models/schedules_event/schedules_event.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
    DatabaseModule,
    JemaatModule,
    DisciplesModule,
    BaptisModule,
    SundayServiceModule,
    SchedulesEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
