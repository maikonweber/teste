# 📄 OCR + RAG Document Analyzer

Aplicação **Full Stack** para upload, digitalização (OCR) e análise de documentos via **chat com IA**.  
Este projeto combina **Node.js, React, TypeScript e SQL, NestJs**, além de técnicas de **OCR** (Tesseract) e **RAG** (Retrieval-Augmented Generation).

---

## 🚀 Funcionalidades
- 📤 **Upload de arquivos PDF**
- 🔎 **OCR (Reconhecimento Óptico de Caracteres)** para extrair texto
- 🗄️ **Armazenamento em banco SQL** (PostgreSQL recomendado)
- 💬 **Chat inteligente** para perguntas sobre documentos enviados (RAG)
- 🌐 **Frontend em Next.js + TypeScript**
- ⚙️ **Backend Node.js (OCR + API)**

---

## 🛠️ Tecnologias
- **Frontend:** React, Next.js, TypeScript, Tailwind
- **Backend OCR:** Node.js (Tesseract.js)
- **Banco de dados:** PostgreSQL
- **IA (RAG):** Embeddings + modelo de linguagem (OpenAI ou local)
- **Infra:** Docker + Docker Compose

---

## 📦 Como rodar

### 1. Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js >= 18](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

### 2. Rodando com script
Basta executar o script de inicialização:

```bash
sudo bash startup.sh
