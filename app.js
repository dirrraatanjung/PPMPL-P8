const express = require('express');
const app = express();

// Middleware untuk parsing JSON dengan batas ukuran payload
app.use(express.json({ limit: '1mb' }));

// Middleware untuk menangani metode HTTP yang tidak didukung
app.use((req, res, next) => {
    if (!['GET', 'POST'].includes(req.method)) {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    next();
});

// Endpoint root
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Endpoint untuk mendapatkan data
app.get('/api/data', (req, res) => {
    res.status(200).json({ data: 'This is some data' });
});

// Endpoint untuk menambahkan data
app.post('/api/data', (req, res) => {
    const { item } = req.body;
    if (!item) {
        return res.status(400).json({ error: 'Item is required' });
    }
    res.status(201).json({ message: 'Data added', item });
});

// Middleware untuk menangani 404 (endpoint tidak ditemukan)
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = app;