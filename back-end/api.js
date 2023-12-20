const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());

async function pegar_a_cotacao(moeda1, moeda2) {
  try {
    const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${moeda1}-${moeda2}`);

    if (response.status === 200) {
      const DadosDeCotacao = response.data;

      valor_recente_moeda = DadosDeCotacao[moeda1 + moeda2].bid; 
      console.log(valor_recente_moeda);
    }
  } catch (error) {
    console.log('Ocorreu um erro ao buscar os dados da cotação', error);
  }
}

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/:moeda1/:moeda2', async (req, res) => {
  const moeda1 = req.params.moeda1;
  const moeda2 = req.params.moeda2;

  await pegar_a_cotacao(moeda1, moeda2);
    if(valor_recente_moeda !== null){
    res.json({ valor: valor_recente_moeda });
    } else {
      res.send('Erro ao achar a cotação');
    }
});

