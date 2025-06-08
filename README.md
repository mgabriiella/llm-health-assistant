# Health Assistant API

Este projeto é um backend Node.js com um frontend simples em HTML/JavaScript que consulta a API do OpenRouter (modelo DeepSeek gratuito) para responder perguntas sobre saúde, dicas sobre hidratação e bem-estar. O backend fornece um endpoint `/api/perguntas`, e o frontend permite enviar perguntas e exibir respostas.

## Objetivo
- Criar uma API REST que consulta um LLM para responder perguntas sobre saúde.
- Fornecer respostas seguras e baseadas em diretrizes gerais, com advertência para consultar médicos.
- Inclui um frontend HTML para interação amigável.

## Pré-requisitos
1. **Node.js**:
   - Instale em https://nodejs.org/ (versão LTS).
   - Verifique:
     ```
     node --version
     npm --version
     ```
2. **Chave da API do OpenRouter**:
   - Acesse https://openrouter.ai, crie uma conta e gere uma chave de API.
   - Copie para o `.env`.
3. **Git**:
   - Instale em https://git-scm.com/ e configure:
     ```
     git config --global user.name "Seu Nome"
     git config --global user.email "seu.email@example.com"
     ```

## Configuração
1. **Clone o Repositório** (após criar no GitHub):
   ```
   git clone https://github.com/seu-usuario/health-assistant-api.git
   cd health-assistant-api
   ```
2. **Instale Dependências**:
   ```
   npm install
   ```
3. **Crie o Arquivo `.env`**:
   - Na raiz, crie um `.env` com:
     ```
     OPENROUTER_API_KEY=sk-or-xxx
     PORT=5000
     ```
   - Substitua `sk-or-xxx` pela sua chave da API do OpenRouter.
4. **Estrutura do Projeto**:
   ```
   health-assistant-api/
   ├── src/
   │   └── index.js       # Backend (API)
   ├── public/
   │   └── index.html     # Frontend (HTML)
   ├── .env               # Credenciais
   ├── .gitignore         # Ignora node_modules e .env
   ├── package.json       # Dependências e scripts
   └── README.md          # Instruções
   ```

## Uso
1. **Inicie o Servidor**:
   - Em modo de produção:
     ```
     npm start
     ```
   - Em modo de desenvolvimento:
     ```
     npm run dev
     ```
   - O servidor rodará em `http://localhost:5000`.
2. **Acesse o Frontend**:
   - Abra `http://localhost:5000` no navegador.
   - Digite uma pergunta (ex.: "Qual meu IMC se peso 70kg e tenho 1,65m?") e clique em "Enviar".
   - A resposta aparecerá na tela.
3. **Teste o Endpoint Diretamente**:
   - Use Postman ou cURL:
     ```
     curl -X POST http://localhost:5000/api/perguntas \
     -H "Content-Type: application/json" \
     -d '{"pergunta": "Quantos litros de água devo tomar por dia se peso 60kg?"}'
     ```
   - Resposta esperada:
     ```json
     {
       "resposta": "Como orientação geral, recomenda-se consumir cerca de 35ml de água por kg de peso corporal por dia. Para 60kg, isso seria aproximadamente 2,1 litros de água por dia. Consulte um profissional de saúde para recomendações personalizadas."
     }
     ```

## Notas Importantes
- **Contexto do LLM**:
  - O prompt do sistema limita respostas a temas de saúde (IMC, perda de peso, hidratação) e reforça a consulta a médicos.
- **Limitações do Modelo Gratuito**:
  - O DeepSeek via OpenRouter tem quotas limitadas no plano gratuito. Monitore em https://openrouter.ai.
- **Solução de Problemas**:
  - **Frontend não funciona**:
    - Abra o console do navegador (F12 > Console) e verifique erros.
    - Confirme que o backend está rodando (`npm run dev`).
    - Teste o endpoint no Postman: `POST http://localhost:5000/api/perguntas`.
  - **Erro 401 (Unauthorized)**: Verifique a chave no `.env` (sem espaços).
  - **Erro 429 (Rate Limit)**: Excedeu a quota. Aguarde ou consulte https://openrouter.ai.
  - **Erro de Rede**: Teste:
    ```
    ping openrouter.ai
    ipconfig /flushdns
    ```
- **Ética**:
  - Respeite os termos da OpenRouter (https://openrouter.ai/terms).
  - Não use para fins médicos sem supervisão profissional.
- **Frontend**:
  - O HTML é básico. Para melhorias, considere React ou Vue.js.

## Como Subir para o GitHub
1. **Inicialize o Repositório**:
   ```
   git init
   ```
2. **Adicione Arquivos**:
   ```
   git add .
   ```
3. **Faça o Commit**:
   ```
   git commit -m "Projeto inicial: API e frontend para assistente de saúde"
   ```
4. **Crie o Repositório no GitHub**:
   - Instale o GitHub CLI:
     ```
     winget install --id GitHub.cli
     ```
   - Faça login:
     ```
     gh auth login
     ```
   - Crie o repositório:
     ```
     gh repo create health-assistant-api --public --source=. --remote=origin
     ```
5. **Suba o Código**:
   ```
   git push -u origin main
   ```
6. **Verifique**:
   - Acesse `https://github.com/seu-usuario/health-assistant-api`.
   - Confirme os arquivos, exceto `.env`.
