import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
// import { OpenAI } from 'langchain/llms/openai';
// import { Document } from 'langchain/schema';
// import { Embeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

@Injectable()
export class RagService {
  // private llm: OpenAI;
  private vectorStore: MemoryVectorStore;

  constructor(private prismaService: PrismaService) {
    // this.llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
    // this.vectorStore = new MemoryVectorStore(new Embeddings());
  }

  // Inicializa o vetor de embeddings a partir do banco
  async initVectorStore() {
    const documents = await this.prismaService.document.findMany();
    
    // const docs: Document[] = documents.map(doc => ({
    //   pageContent: doc.text,
    //   metadata: { filename: doc.filename, id: doc.id },
    // }));

    // await this.vectorStore.addDocuments(docs);
  }

  // RAG: recebe uma query e retorna resposta baseada nos documentos
  async query(queryText: string) {
    // Recupera documentos mais relevantes
    const results = await this.vectorStore.similaritySearch(queryText, 3); // top 3 resultados

    // Concatena texto dos docs para passar para LLM
    const context = results.map(r => r.pageContent).join('\n\n');

    // Pergunta para LLM usando contexto
    // const response = await this.llm.call(`${context}\n\nPergunta: ${queryText}\nResposta:`);

    // return response;
  }
}
