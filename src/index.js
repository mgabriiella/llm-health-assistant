import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Configura o diretório atual
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Configurações da API OpenRouter
const OPEN_ROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'deepseek/deepseek-chat:v3-0324-free'; // Modelo gratuito
const CONTEXTO = `Você é um assistente de saúde especializado em responder perguntas sobre IMC, perda de peso e hidratação. Forneça respostas precisas, seguras e baseadas em diretrizes gerais de saúde. Não substitua um profissional médico.`;

app.post('/api/perguntas', async (req, res) => {
  const { pergunta } = req.body;

  if (!pergunta) {
    return res.status(400).json({ erro: 'Pergunta é obrigatória.' });
  }

  try {
    const resposta = await axios.post(
      OPEN_ROUTER_URL,
      {
        model: MODEL,
        messages: [
          { role: 'system', content: CONTEXTO },
          { role: 'user', content: pergunta },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ resposta: resposta.data.choices[0].message.content });
  } catch (err) {
    console.error('Erro ao consultar LLM:', err.response?.data || err.message);
    res.status(500).json({ erro: 'Falha ao consultar modelo LLM.' });
  }
});

// Rota padrão para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});