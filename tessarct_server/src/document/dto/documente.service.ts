import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import * as pdf2pic from 'pdf2pic'; // converte PDF em imagens
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DocumentService {

  constructor(private prismaService: PrismaService) {}

  async startTesseract(file: Express.Multer.File): Promise<string> {
    let extractedText: string;

  if (file.mimetype.includes('pdf')) {
    extractedText = await this.extractTextFromPdf(file.path, file.buffer);
  } else {
    extractedText = await this.extractTextFromImage(file.path);
  }

    // Salva no banco
    await this.prismaService.document.create({
      data: {
        filename: file.originalname,
        text: extractedText,
      },
    });

    return extractedText;
  }

  private async extractTextFromImage(filePath: string): Promise<string> {
    const result = await Tesseract.recognize(filePath, 'por'); // ou 'eng'
    return result.data.text;
  }

  private async extractTextFromPdf(filePath: string, buffer?: Buffer): Promise<string> {
  const converter = buffer
    ? pdf2pic.fromBuffer(buffer, {
        density: 200,
        saveFilename: 'page',
        savePath: './uploads',
        format: 'png',
        width: 1200,
        height: 1600,
      })
    : pdf2pic.fromPath(filePath, {
        density: 200,
        saveFilename: 'page',
        savePath: './uploads',
        format: 'png',
        width: 1200,
        height: 1600,
      });

  const pages: any = await converter.bulk(-1, { responseType: "buffer" });

  let fullText = '';
  for (const page of pages) {
    const result = await Tesseract.recognize(page.buffer, "por");
    fullText += result.data.text + '\n';
  }

  return fullText.trim();
  }
}
