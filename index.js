import express from 'express';
import pg from 'pg';
const { Pool } = pg;

const app = express();
const port = 3000;

app.use(express.json()); // Middleware untuk parsing request body (JSON)

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
// METHOD POST: Menambahkan data baru
app.post('/', async (req, res) => {
    try {
        const { nama, nim, kelas } = req.body;
        const query = 'INSERT INTO biodata (nama, nim, kelas) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(query, [nama, nim, kelas]);
        res.status(201).json({ message: "Data berhasil ditambahkan", data: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database error");
    }
});

