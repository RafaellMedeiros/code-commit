import { useEffect, useState } from 'react';

interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
}

export default function App() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao conectar com o backend');
        return res.json();
      })
      .then((json: HealthResponse) => setData(json))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <main className="container">
      <h1>Code Connect Monorepo</h1>
      <p>Frontend (React + Vite + TS) &amp; Backend (Node + Express + TS)</p>

      <div className="card">
        <h2>Status do Backend</h2>
        {error && <p className="error">Erro: {error}</p>}
        {!data && !error && <p>Conectando ao backend...</p>}
        {data && (
          <div className="status-box">
            <p><strong>Status:</strong> {data.status}</p>
            <p><strong>Mensagem:</strong> {data.message}</p>
            <p><strong>Horário:</strong> {new Date(data.timestamp).toLocaleString('pt-BR')}</p>
          </div>
        )}
      </div>
    </main>
  );
}
