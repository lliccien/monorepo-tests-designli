// src/original-record.dto.ts
import { Type } from 'class-transformer';

class SpamVerdict {
  status: string;
}

class VirusVerdict {
  status: string;
}

class SpfVerdict {
  status: string;
}

class DkimVerdict {
  status: string;
}

class DmarcVerdict {
  status: string;
}

class Receipt {
  @Type(() => SpamVerdict)
  spamVerdict: SpamVerdict;

  @Type(() => VirusVerdict)
  virusVerdict: VirusVerdict;

  @Type(() => SpfVerdict)
  spfVerdict: SpfVerdict;

  @Type(() => DkimVerdict)
  dkimVerdict: DkimVerdict;

  @Type(() => DmarcVerdict)
  dmarcVerdict: DmarcVerdict;

  processingTimeMillis: number;
}

class Mail {
  timestamp: string;
  source: string;

  @Type(() => String)
  destination: string[];
}

class SES {
  @Type(() => Receipt)
  receipt: Receipt;

  @Type(() => Mail)
  mail: Mail;
}

class Record {
  @Type(() => SES)
  ses: SES;
}

export class OriginalRecord {
  @Type(() => Record)
  Records: Record[];
}
