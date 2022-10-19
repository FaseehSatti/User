const http = require('http');
const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
//load env file
dotenv.config({path: './config/config.env'}); 
const users = require('./routers/users');
const auth = require('./routers/auth');
const products = require('./routers/products');
const errorHandler = require('./middleware/error');
// database connection
connectDB();

const app = express();

app.get('/',(req,res)=>{
    res.send("welcome")
})
app.use(bodyparser.json());
app.use(cors());
app.use(express.json());
// app.use(`/api/users`,users);
app.use(`/api`,auth);
app.use('/api/products',products);
app.use(errorHandler);


// const server = http.createServer((req,res)=>{
//     // console.log(req.headers,req.url,req.method);
//     console.log(req.method);
//     res.end();
// });

// const PORT = 4500;
app.listen(process.env.PORT,()=> console.log(`Server ruuning on port ${process.env.PORT}`));
