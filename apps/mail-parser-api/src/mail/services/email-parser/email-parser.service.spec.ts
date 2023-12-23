import { Test, TestingModule } from '@nestjs/testing';
import { EmailParserService } from './email-parser.service';
import * as mailparser from 'mailparser';
import * as fs from 'fs/promises';
import axios from 'axios';

jest.mock('axios');
jest.mock('fs/promises');

describe('EmailParserService', () => {
  let service: EmailParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailParserService],
    }).compile();

    service = module.get<EmailParserService>(EmailParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse email content from a URL and extract JSON', async () => {
    const mockUrl = 'http://example.com/email';
    const mockEmailContent = 'Email content from URL';
    const mockJsonData = { key: 'value' };
    const mockParsedEmail = {
      attachments: [
        {
          contentType: 'application/json',
          content: JSON.stringify(mockJsonData),
        },
      ],
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockEmailContent });
    jest.spyOn(mailparser, 'simpleParser').mockResolvedValue(mockParsedEmail);

    const result = await service.parseEmail(mockUrl);
    expect(axios.get).toHaveBeenCalledWith(mockUrl, { responseType: 'text' });
    expect(result).toEqual(mockJsonData);
  });

  it('should parse email content from a file and extract JSON', async () => {
    const mockFilePath = '/path/to/email';
    const mockEmailContent = 'Email content from file';
    const mockJsonData = { key: 'value' };
    const mockParsedEmail = {
      attachments: [
        {
          contentType: 'application/json',
          content: JSON.stringify(mockJsonData),
        },
      ],
    };

    (fs.readFile as jest.Mock).mockResolvedValue(mockEmailContent);
    jest.spyOn(mailparser, 'simpleParser').mockResolvedValue(mockParsedEmail);

    const result = await service.parseEmail(mockFilePath);
    expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    expect(result).toEqual(mockJsonData);
  });

  it('should extract JSON from a link in the email content', async () => {
    const mockEmailWithLink = {
      textAsHtml: '<a href="http://example.com/jsondata">JSON Data</a>',
    };
    const mockJsonData = { key: 'value from link' };
    const urlInEmail = 'http://example.com/jsondata';

    jest.spyOn(mailparser, 'simpleParser').mockResolvedValue(mockEmailWithLink);
    (axios.get as jest.Mock).mockImplementation((url: string) => {
      if (url === urlInEmail) {
        return Promise.resolve({
          data: mockJsonData,
          headers: { 'content-type': 'application/json' },
        });
      }
      return Promise.reject(new Error('URL not mocked'));
    });

    const result = await service.parseEmail(
      '../../../../files/email-json-link.eml',
    );
    expect(result).toEqual(mockJsonData);
    expect(axios.get).toHaveBeenCalledWith(urlInEmail);
  });
});
