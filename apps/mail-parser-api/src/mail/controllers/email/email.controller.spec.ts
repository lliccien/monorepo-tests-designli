import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailParserService } from '../../services/email-parser/email-parser.service';
import { EmailSourceDto } from '../../dto/email-source.dto';
import { Response } from 'express';

describe('EmailController', () => {
  let controller: EmailController;
  let mockEmailParserService: Partial<EmailParserService>;
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    mockEmailParserService = {
      parseEmail: jest.fn(),
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        { provide: EmailParserService, useValue: mockEmailParserService },
      ],
    }).compile();

    controller = module.get<EmailController>(EmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should parse email successfully and return data', async () => {
    const emailSourceDto: EmailSourceDto = {
      source: '../../../../files/email-json-attach.eml',
    };

    const mockParsedEmailData = {
      subject: 'Asunto de Prueba',
      body: 'Cuerpo del mensaje',
    };
    (mockEmailParserService.parseEmail as jest.Mock).mockResolvedValue(
      mockParsedEmailData,
    );

    await controller.parseEmail(emailSourceDto, mockResponse as Response);

    expect(mockEmailParserService.parseEmail).toHaveBeenCalledWith(
      emailSourceDto.source,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockParsedEmailData);
  });

  it('should handle not found email source', async () => {
    const emailSourceDto: EmailSourceDto = {
      source: '../../../../files/email.eml',
    };

    (mockEmailParserService.parseEmail as jest.Mock).mockResolvedValue(null);

    await controller.parseEmail(emailSourceDto, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith(
      'No se encontró el archivo JSON.',
    );
  });

  it('should handle internal server error', async () => {
    const emailSourceDto: EmailSourceDto = {
      source: '../../../../files/email-json-attach.html',
    };

    (mockEmailParserService.parseEmail as jest.Mock).mockRejectedValue(
      new Error('Error simulado'),
    );

    await controller.parseEmail(emailSourceDto, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(
      'Error al procesar el correo electrónico.',
    );
  });
});
