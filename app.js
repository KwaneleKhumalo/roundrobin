require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const runApp = require('./Db/Connection')
const {router} = require('./Routes/RegRoutes');
const port = process.env.PORT || 3000;
const notFoundRoute = require('./middleware/notFound');
const errorHandler = require('./middleware/ErrorMiddleware');


app.use(express.json())

app.use('/api/v1/auth', router)

// Error Handlers
app.use(notFoundRoute)
app.use(errorHandler)

runApp(app, port);
