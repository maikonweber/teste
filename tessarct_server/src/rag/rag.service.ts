import { Injectable } from '@nestjs/common';
import { Document } from 'langchain/document';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { PrismaService } from 'prisma/prisma.service';
// import { ChatOpenAI } from '@langchain/openai'; // se for usar LLM

@Injectable()
export class RagService {
  private vectorStore: MemoryVectorStore;
  private llm: ChatOpenAI;

  constructor(private prismaService: PrismaService) {
    // inicializa embeddings e vectorStore
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.vectorStore = new MemoryVectorStore(embeddings);

    // se quiser usar LLM no RAG
    this.llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Inicializa o vetor de embeddings a partir do banco
  async initVectorStore() {
    const documents = await this.prismaService.document.findMany();

    const docs: Document[] = documents.map((doc) => ({
      pageContent: doc.text,
      metadata: { filename: doc.filename, id: doc.id },
    }));

    await this.vectorStore.addDocuments(docs);
  }

  // RAG: recebe uma query e retorna resposta baseada nos documentos
  async query(queryText: string) {
  // Recupera documentos mais relevantes
  const results = await this.vectorStore.similaritySearch(queryText, 3);

  // Concatena texto dos docs
  const context = results.map((r) => r.pageContent).join("\n\n");

  // Prompt mais direcionado
  const response = await this.llm.invoke([
      {
        role: "system",
        content:
          "Você é um assistente financeiro. Responda de forma clara e objetiva com base EXCLUSIVA nos documentos fornecidos. " +
        " Se não encontrar a resposta no contexto, responda apenas: 'Não encontrado'."
      },
      {
        role: "user",
        content: `Contexto:\n${context}\n\nPergunta: ${queryText}\nResposta:`
      }
    ]);

    return {
      resposta: response.content,
      documentos: results.map((r) => r.metadata),
      tokens: response.response_metadata?.tokenUsage ?? {}
    };
  }
}
