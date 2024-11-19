const express = require('express');
const cors = require('cors');
const db = require('./db');

const userRouter = require('./UserRouter');
const bookRouter = require('./BookRouter');
const issuedBookRouter = require('./IssuedBookRouter');

const PORT =  4000; 

const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    optionsSuccessStatus:200
}))

app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/issuedBook', issuedBookRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`); 
});