import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './provider/database/provider.module';
import { JemaatModule } from './models/jemaat/jemaat.module';
import { DisciplesModule } from './models/disciples/disciples.module';
import { BaptisModule } from './models/baptis/baptis.module';
import { IbadahModule } from './models/ibadah/ibadah.module';
import { SchedulesEventModule } from './models/schedules_event/schedules_event.module';
import { ConfigModule } from '@nestjs/config';
import { BlesscomnModule } from './models/blesscomn/blesscomn.module';
import { WilPelayananModule } from './models/wil_pelayanan/wil_pelayanan.module';
import { MailModule } from './models/mail/mail.module';
import { UploadModule } from './models/image/multer.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
    DatabaseModule,
    JemaatModule,
    DisciplesModule,
    BaptisModule,
    IbadahModule,
    SchedulesEventModule,
    BlesscomnModule,
    WilPelayananModule,
    MailModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
