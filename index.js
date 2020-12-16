// importa o express (instalar o express via npm primeiro)
const express = require("express");

// importa o middleware body-parser
const bodyParser = require("body-parser");

// importar a rota de usuários
const userRoute = require("./routes/userRoute");

// cria uma constante para acessar os métodos do express
const app = express();

// adiciona o middleware para receber requisições em json
app.use(bodyParser.json());

//registra a rota users
userRoute(app);

// registrar um recurso (método GET)
app.get("/:nome?", (req, res) => {
    
    res.send(`Olá mundo, feito com Node.js + Express <br/> Seu nome: ${req.params["nome"] ?? "não informado"}`)
});



// inicia o servidor web
app.listen(8000, () => console.log("API rodando na porta 8000"));