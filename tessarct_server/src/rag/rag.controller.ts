import { Controller, Get, Query } from '@nestjs/common';
import { RagService } from './rag.service';

@Controller('rag')
export class RagController {
  constructor(private ragService: RagService) {}

  @Get()
  async ask(@Query('q') question: string) {
    // Inicializa vector store (normalmente você faria só uma vez na inicialização)
    await this.ragService.initVectorStore();

    const answer = await this.ragService.query(question);
    return { answer };
  }
}