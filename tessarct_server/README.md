Objetivo

O objetivo deste desafio é desenvolver uma aplicação Full Stack que simule a digitalização e a análise de documentos. O projeto deve demonstrar suas habilidades em Python, Node.js, React, TypeScript e SQL, além de conhecimentos em IA, especificamente OCR (Reconhecimento Óptico de Caracteres) e RAG (Retrieval-Augmented Generation).

Cenário de negócio

Na MOCS, trabalhamos para otimizar processos em grandes eventos. Uma de nossas necessidades é processar rapidamente contratos e formulários em papel. Para isso, precisamos de uma ferramenta que capture o texto de documentos digitalizados e, com base nesse texto, consiga responder a perguntas sobre o conteúdo do documento.


Requisitos técnicos
Back-end (Node.js/Python):

Crie uma API REST para gerenciar a aplicação.

A funcionalidade principal é um endpoint que receba a imagem de um documento (por exemplo, um arquivo PDF ou imagem JPEG/PNG).

O back-end deve utilizar uma biblioteca de OCR (como tesseract-ocr ou similar) para extrair o texto do documento e salvá-lo junto à imagem em um banco de dados SQL.

Crie um endpoint para enviar uma pergunta sobre um documento já processado.

Utilizando o texto extraído e um framework de RAG (como LangChain ou LangGraph), o back-end deve responder à pergunta. A resposta não precisa ser perfeita, o foco é a implementação do conceito.

Front-end (React/TypeScript):

Desenvolva uma interface simples e intuitiva para o usuário.

Uma página inicial com um campo para fazer o upload de um documento.

Após o upload, exiba o documento e o texto extraído pelo OCR em uma tela.

Em uma tela separada (ou na mesma tela, como preferir), permita que o usuário insira uma pergunta sobre o documento e exiba a resposta gerada pela IA.

Bases de Dados (SQL):

Utilize um banco de dados relacional para armazenar os documentos processados e seus respectivos textos extraídos.

Uma tabela documents com campos como id, file_name, text_content e created_at é suficiente.



Instruções para a entrega
O projeto deve ser entregue em um repositório Git público (como GitHub, GitLab ou Bitbucket).

Inclua um arquivo README.md com instruções claras sobre como configurar e executar o projeto localmente.

O projeto deve ser conteinerizado com Docker e ter um arquivo docker-compose.yml que permita a execução de todas as partes da aplicação (front-end, back-end e banco de dados) com um único comando (docker-compose up).

O código deve seguir boas práticas de desenvolvimento (organização, legibilidade, comentários quando necessário).

Adicione um breve texto no README.md e vídeo explicando as decisões técnicas tomadas, as bibliotecas utilizadas e como o projeto atende aos requisitos do desafio.

O projeto deve ser enviado como resposta até 22/09 às 18h.