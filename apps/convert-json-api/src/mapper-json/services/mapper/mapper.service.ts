import { Injectable } from '@nestjs/common';
import { OriginalRecord, TransformedRecord } from '../../dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MapperService {
  mappedRecord(originalRecord: OriginalRecord): TransformedRecord[] {
    const result = originalRecord.Records.map((record) =>
      plainToClass(TransformedRecord, record, {
        excludeExtraneousValues: true,
      }),
    );
    return result;
  }
}
