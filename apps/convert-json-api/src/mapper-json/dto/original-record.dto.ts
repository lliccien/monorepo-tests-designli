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

class Action {
  type: string;
  topicArn: string;
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

  timestamp: string;

  recipients: string[];

  dmarcPolicy: string;

  action: Action;
}

class HeadersMail {
  name: string;
  value: string;
}

class CommonHeaders {
  returnPath: string;
  from: string[];
  date: string;
  to: string[];
  messageId: string;
  subject: string;
}

class Mail {
  timestamp: string;
  source: string;

  @Type(() => String)
  destination: string[];

  messageId: string;

  headersTruncated: boolean;

  headers: HeadersMail[];

  commonHeaders: CommonHeaders;
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

  eventVersion: string;

  eventSource: string;
}

export class OriginalRecord {
  @Type(() => Record)
  Records: Record[];
}
