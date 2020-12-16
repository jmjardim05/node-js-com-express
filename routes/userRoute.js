// vamos importar esse arquivo no index.js

// importar o fs (trabalhar com o sistema de arquivos do SO)
const fs = require("fs");

// estamos pegando o join via destructuring assignment
const {
    join
} = require("path");

// join(str, str, ...) une partes para criar um caminho de arquivo
const caminhoArq = join(__dirname, "users.json");

const getUsers = () => {
    // fs.existsSync(caminho) verifica se um arquivo existe (método síncrono)
    // fs.readFileSync(caminho) lê todo o arquivo (síncrono)
    const data = fs.existsSync(caminhoArq) ? fs.readFileSync(caminhoArq) : [];

    try {
        return JSON.parse(data); // transforma a string em json (*parse)
    } catch {
        return [];
    }
}

// fs.writeFileSync(caminho, dados) escreve no arquivo substituindo o conteúdo se ele já existir
// JSON.stringify => transforma o JSON em string, podendo adicionar identação, charset, etc...
const saveUser = (users) => fs.writeFileSync(caminhoArq, JSON.stringify(users, null, "\t"));


// registrar o GET e o POST na API
const userRoute = (app) => {
    // usar dois pontos ':' para definir um parâmetro
    // usar interrogação '?' ao final para definir que o parâmetro é opcional
    app.route("/users/:id?")
        .get((req, res) => {
            const users = getUsers();

            if (req.params["id"] !== undefined) {
                const user = users.filter((value) => {
                    if (value.id === Number.parseInt(req.params["id"])) {
                        return value
                    }
                });
                res.send({
                    users: user
                });
            } else {
                res.send({
                    users
                });
            }
        })
        .post((req, res) => {
            const users = getUsers();
            users.push(req.body);
            saveUser(users);
            // pra ele transformar o body em objeto, precisa instalar um middleware body-parser

            res.sendStatus(201);
        });
}

module.exports = userRoute;

//1302134-20201215-854a2d01