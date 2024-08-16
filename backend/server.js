require('./conn'); // Ensure this correctly sets up your database connection
const express = require('express');
const User = require('./userModel');
const userRouter =require('./router/userRouter')

const app = express();
const port = 4000;

app.use(express.json());

app.use('/api/v1',userRouter);


app.listen(port, () => {
    console.log(`Running at port ${port}`);
});
