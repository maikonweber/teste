import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './documente.service';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('document') // agrupa no Swagger
@Controller()
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Faz upload de um arquivo (PDF ou imagem)' })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        pdfs: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo PDF ou imagem para upload',
        },
        
      },
    },
  })
  @UseInterceptors(FileInterceptor('pdfs'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const text = await this.documentService.startTesseract(file);

    return {
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      extractedText: text,
    };
  }
}
