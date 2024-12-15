const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = 3000

const config = {
    host: 'database',
    user: 'root',
    password: 'password',
    database: 'node'
}

const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
    const query = 'SELECT * FROM peoples';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erro ao buscar usuários:', error);
            return res.status(500).send('Erro ao buscar usuários');
        }
        res.render('index', { users: results });
    });
});

app.post('/add-user', (req, res) => {
    const name = req.body.name;

    const query = `INSERT INTO peoples(name) values('${name}')`;

    connection.query(query)
    
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`rodando na porta ${port}`);
})