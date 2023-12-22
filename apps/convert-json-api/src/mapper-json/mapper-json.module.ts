import { Module } from '@nestjs/common';
import { MapperService } from './services/mapper/mapper.service';
import { MapperPostController } from './controllers/mapper-post/mapper-post.controller';

@Module({
  providers: [MapperService],
  controllers: [MapperPostController],
})
export class MapperJsonModule {}
