require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./src/utils/db')

// const hi = require('./src/utils/insert')

const app = express();
const port =3000;

const loginRouter = require('./src/router/login')
const registerRouter = require('./src/router/register')
const queryRouter = require('./src/router/query')

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/',loginRouter)
app.use('/',registerRouter)
app.use('/query',queryRouter)

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

