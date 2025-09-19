'use client'
import { useState } from "react";

export default function RagPdfChat() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [tokens, setTokens] = useState<number | null>(null);
  const [resposta, setResposta] = useState("");
 

  const API_URL = "http://localhost:3000";


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPdfFiles([...e.target.files]);
    setResposta("");
    setDocumentos([]);
    setTokens(null);
  };

   const handleAsk = async () => {
    if (!question.trim()) return;

    setAsking(true);
    setResposta("");
    setDocumentos([]);
    setTokens(null);

    try {
      const response = await fetch(
       `${API_URL}/rag?q=${encodeURIComponent(question)}`,
      );
      const data = await response.json();

      const ans = data.answer || {};
      setResposta(ans.resposta || "Nenhuma resposta encontrada.");
      setDocumentos(ans.documentos || []);
      setTokens(ans.tokens?.totalTokens ?? null);
    } catch (error) {
      setResposta("Erro ao buscar resposta.");
    } finally {
      setAsking(false);
    }
  };

  // Envia arquivos para API e limpa a lista
  const handleUpload = async () => {
    if (pdfFiles.length === 0) {
      alert("Selecione ao menos um PDF!");
      return;
    }

    setLoading(true);

    try {

    
      const formData = new FormData();
      // Only one file
      pdfFiles.forEach((file) => formData.append("pdfs", file));
      
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(data.message || "Upload realizado com sucesso!");
      
      // Limpa os arquivos após upload
      setPdfFiles([]);
    } catch (error) {
      alert("Erro ao fazer upload dos PDFs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Chat com PDF</h1>

        {/* Upload PDFs */}
        <div className="flex flex-col space-y-2">
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="px-4 py-2 border rounded-lg"
          />
          {pdfFiles.length > 0 && (
            <div className="flex flex-col space-y-1">
              {pdfFiles.map((file, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {file.name}
                </p>
              ))}
              <button
                onClick={handleUpload}
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Upload"}
              </button>
            </div>
          )}
        </div>

        {/* Pergunta */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Digite sua pergunta sobre o PDF..."
            className="flex-1 color-red px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          />
          <button
            onClick={handleAsk}
            disabled={asking}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {asking ? "Perguntando..." : "Perguntar"}
          </button>
        </div>

        {/* Resposta */}
        {resposta && (
          <div className="p-4 bg-gray-50 border rounded-xl shadow-sm space-y-2">
            <p className="text-gray-800 whitespace-pre-line">{resposta}</p>

            {documentos.length > 0 && (
              <div className="text-sm text-gray-600">
                <strong>Documentos usados:</strong>
                <ul className="list-disc pl-5">
                  {documentos.map((doc, idx) => (
                    <li key={idx}>{JSON.stringify(doc)}</li>
                  ))}
                </ul>
              </div>
            )}

            {tokens !== null && (
              <p className="text-xs text-gray-500">Tokens usados: {tokens}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
