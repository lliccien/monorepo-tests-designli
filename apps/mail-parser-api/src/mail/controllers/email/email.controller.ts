import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailSourceDto } from '../../dto/email-source.dto';
import { EmailParserService } from '../../services/email-parser/email-parser.service';

@Controller('email-parser')
export class EmailController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Post()
  async parseEmail(
    @Body() emailSourceDto: EmailSourceDto,
    @Res() res: Response,
  ) {
    try {
      const emailData = await this.emailParserService.parseEmail(
        emailSourceDto.source,
      );
      if (!emailData) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send('No se encontró el archivo JSON.');
      }
      return res.status(HttpStatus.OK).json(emailData);
    } catch (error) {
      console.error('Error:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Error al procesar el correo electrónico.');
    }
  }
}
