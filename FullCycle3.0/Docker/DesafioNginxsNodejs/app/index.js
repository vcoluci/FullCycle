
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuração do banco de dados
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'db', // Use 'db' se MYSQL_HOST não estiver definido
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Rota para deletar todos os registros
app.delete('/delete-all', (req, res) => {
    db.query('DELETE FROM people', (err) => {
        if (err) {
            console.error('Error deleting records:', err);
            return res.status(500).send('Error deleting records');
        }
        console.log('All records deleted');
        res.send('All records deleted');
    });
});

// Função para conectar ao banco de dados
const connectToDatabase = () => {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            setTimeout(connectToDatabase, 2000); // Tenta reconectar após 2 segundos
            return;
        }
        console.log('Connected to the MySQL database');
    });
};

// Chama a função de conexão ao iniciar a aplicação
connectToDatabase();


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}


// Rota para adicionar um nome e listar nomes
app.get('/', (req, res) => {

    const name = generateRandomString(10);
    console.log(name);
    // Adicionar o nome ao banco de dados
    db.query('INSERT INTO people (name) VALUES (?)', [name], (err) => {
        if (err) {
            console.error('Error inserting name:', err);
            return res.status(500).send('Error inserting name');
        }
        
        // Listar todos os nomes
        db.query('SELECT * FROM people', (err, results) => {
            if (err) {
                console.error('Error fetching names:', err);
                return res.status(500).send('Error fetching names');
            }
            
            let response = '<h1>Full Cycle Rocks!</h1><ul>';
            results.forEach(row => {
                response += `<li>${row.name}</li>`;
            });
            response += '</ul>';
            response += '<button id="delete-button">Delete All Records</button>';
            response += `
                <script>
                    document.getElementById('delete-button').onclick = function() {
                        fetch('/delete-all', { method: 'DELETE' })
                            .then(response => {
                                if (response.ok) {
                                    alert('All records deleted');
                                    location.reload();
                                } else {
                                    alert('Error deleting records');
                                }
                            });
                    };
                </script>
            `;
            res.send(response);
        });
    });

});

// Criar a tabela se não existir
db.query('CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))', (err) => {
    if (err) throw err;
}); 

// Iniciar o servidor
app.listen(port, () => {
    console.log('App running at http://localhost:'+ port);
});

