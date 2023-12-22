import { Module } from '@nestjs/common';
import { EmailController } from './controllers/email/email.controller';
import { EmailParserService } from './services/email-parser/email-parser.service';

@Module({
  controllers: [EmailController],
  providers: [EmailParserService],
})
export class MailModule {}
