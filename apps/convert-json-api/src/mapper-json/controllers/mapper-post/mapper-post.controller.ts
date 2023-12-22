import { Body, Controller, Post } from '@nestjs/common';
import { MapperService } from '../../services/mapper/mapper.service';
import { OriginalRecord, TransformedRecord } from '../../dto';

@Controller('mapper-json')
export class MapperPostController {
  constructor(private readonly mapperService: MapperService) {}

  @Post()
  async transform(@Body() record: OriginalRecord): Promise<TransformedRecord> {
    return this.mapperService.mappedRecord(record);
  }
}
