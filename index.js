import express from 'express';
import pg from 'pg';
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',         
  host: 'localhost',
  database: 'mahasiswa',     
  password: 'faiz18', 
  port: 5432,
});


// METHOD GET: Mengambil semua data dari tabel biodata
app.get('/', (req, res) => {
    console.log("TEST DATA: ");
    pool.query('SELECT * FROM biodata')
        .then(testData => {
            console.log(testData.rows);
            res.json(testData.rows);
})
  .catch (err => {
    console.error("Error executing query", err.stack);
    res.status(500).send("Database error");
    });
  
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

//post
//put