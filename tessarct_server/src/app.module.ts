import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/dto/document.module';
import { RagModule } from './rag/rag.module';

@Module({
  imports: [DocumentModule, RagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
