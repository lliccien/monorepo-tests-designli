import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { globalConfiguration } from './configuration/global.configuration';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '../../../.env',
      envFilePath: join(__dirname, '../../../', '.env'),
      isGlobal: true,
      load: [globalConfiguration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
