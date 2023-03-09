require('dotenv').config();
const connectToDb = require('./Db/Connection')
const express = require('express');
const router = require('./Routes/RegRoutes');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json())


app.use('/registation', router)



app.listen(port, () => {
 connectToDb()
 console.log(`Running on ${port}`);
})
