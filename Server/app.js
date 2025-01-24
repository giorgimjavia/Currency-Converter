import express from 'express';
import bodyParser from 'body-parser';
import { sql, config } from './db.js';

const app = express();
const port = 5000;


app.use(express.static('../public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => pool)
    .catch(err => {
        console.error("Database connection failed:", err);
        process.exit(1); 
    });


app.post('/save', async (req, res) => {
    const { GELAmount, USD, EURO, GBP } = req.body;

   
    if (!GELAmount || (!USD && !EURO && !GBP)) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        const pool = await poolPromise;

        await pool.request()
            .input('GELAmount', sql.Float, GELAmount)
            .input('USD', sql.Float, USD || 0)
            .input('EURO', sql.Float, EURO || 0)  
            .input('GBP', sql.Float, GBP || 0)  
            .query(
                'INSERT INTO ExchangeRates (GELAmount, USD, EURO, GBP) VALUES (@GELAmount, @USD, @EURO, @GBP)'
            );

        res.status(200).send({ message: 'Data saved successfully' });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send({ message: 'Error saving data', error: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
