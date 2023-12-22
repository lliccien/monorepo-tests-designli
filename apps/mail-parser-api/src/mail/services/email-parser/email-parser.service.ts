import { Injectable } from '@nestjs/common';
import { simpleParser, ParsedMail } from 'mailparser';
import { readFile } from 'fs/promises';
import axios from 'axios';

@Injectable()
export class EmailParserService {
  async parseEmail(source: string): Promise<any> {
    const isUrl = this.isValidHttpUrl(source);
    const emailContent = isUrl
      ? await this.downloadEmailContent(source)
      : await readFile(source, 'utf-8');
    const parsedEmail = await simpleParser(emailContent);

    const attachedJson = this.extractAttachedJson(parsedEmail);
    if (attachedJson) {
      return attachedJson;
    }

    const jsonFromLink = await this.extractJsonFromLinks(parsedEmail);

    return jsonFromLink;
  }

  private isValidHttpUrl(string: string): boolean {
    let url: string | URL;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  private async downloadEmailContent(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'text' });
    return response.data;
  }

  private extractAttachedJson(parsedEmail: ParsedMail): any | null {
    for (const attachment of parsedEmail.attachments) {
      if (attachment.contentType === 'application/json') {
        return JSON.parse(attachment.content.toString());
      }
    }
    return null;
  }

  private async extractJsonFromLinks(
    parsedEmail: ParsedMail,
  ): Promise<any | null> {
    const links = this.extractLinks(
      parsedEmail.textAsHtml || parsedEmail.text || '',
    );

    for (const link of links) {
      if (link) {
        try {
          const response = await axios.get(link);

          if (response.headers['content-type'].includes('application/json')) {
            return response.data;
          }
        } catch (error) {
          console.error('Error al descargar el archivo JSON:', error);
        }
      }
    }
    return null;
  }

  private extractLinks(text: string): string[] {
    const regex = /href=["']?(http[s]?:\/\/[^"'\s>]+)["']?/g;
    // eslint-disable-next-line prefer-const
    let hits: string[] = [];
    let match: string[];

    while ((match = regex.exec(text)) !== null) {
      hits.push(match[1]);
    }

    return hits;
  }
}
