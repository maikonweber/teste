import { Module } from '@nestjs/common';
import { DocumentService } from './documente.service';
import { DocumentController } from './document.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [DocumentController],
  providers: [DocumentService, PrismaService],
})

export class DocumentModule {}
