import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { globalConfiguration } from './configuration/global.configuration';
import { join } from 'path';
import { MapperJsonModule } from './mapper-json/mapper-json.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../../', '.env'),
      isGlobal: true,
      load: [globalConfiguration],
    }),
    MapperJsonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
