require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const runApp = require('./Db/Connection')
const {router, sendMailRoute} = require('./Routes/RegRoutes');
const {dash} = require('./Routes/dashRoute')
const port = process.env.PORT || 3000;
const notFoundRoute = require('./middleware/notFound');
const errorHandler = require('./middleware/ErrorMiddleware');
const authorized = require('./middleware/Auth')



app.use(express.json())
app.use('/api/v1/auth', router)
app.use('/api/v1/auth', sendMailRoute)

app.use(authorized);
app.use('/api/v1/dash', dash);

// Middleware
app.use(notFoundRoute)
app.use(errorHandler)

runApp(app, port);
