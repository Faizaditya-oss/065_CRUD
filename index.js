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
// METHOD PUT: Mengubah data berdasarkan ID
app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, nim, kelas } = req.body;
        //Parameter Query.
        const query = 'UPDATE biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4 RETURNING *';
        const result = await pool.query(query, [nama, nim, kelas, id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.json({ message: "Data berhasil diupdate", data: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database error");
    }
});

// METHOD DELETE: Menghapus data berdasarkan ID
app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM biodata WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.json({ message: "Data berhasil dihapus", data: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Database error");
    }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
