import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { globalConfiguration } from './configuration/global.configuration';
import { join } from 'path';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../../', '.env'),
      isGlobal: true,
      load: [globalConfiguration],
    }),
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
