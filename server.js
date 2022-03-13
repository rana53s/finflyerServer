require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Connect Database Connection
connectDB();

const app = express();

app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/private', require('./routes/private'));

app.use(errorHandler);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
});