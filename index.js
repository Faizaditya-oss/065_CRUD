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


