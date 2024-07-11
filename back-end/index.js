const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());

// Função que busca a cotação e retorna o valor
async function pegar_a_cotacao(moeda1, moeda2) {
  try {
    const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${moeda1}-${moeda2}`);
    if (response.status === 200) {
      const DadosDeCotacao = response.data;
      const valor_recente_moeda = DadosDeCotacao[moeda1 + moeda2].bid;
      return valor_recente_moeda;
    } else {
      throw new Error('Não foi possível obter a cotação');
    }
  } catch (error) {
    console.log('Ocorreu um erro ao buscar os dados da cotação', error);
    throw error;
  }
}

// Define a rota para obter a cotação
app.get('/:moeda2/:moeda1', async (req, res) => {
  const { moeda1, moeda2 } = req.params;
  try {
    const valor_recente_moeda = await pegar_a_cotacao(moeda1, moeda2);
    res.json({ valor: valor_recente_moeda });
  } catch (error) {
    res.status(500).send('Erro ao achar a cotação');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
