const express = require('express');
const app = express();
const mongoose = require('mongoose');

const articlerouter = require('./routes/articles');

const port = process.env.PORT || 3000

// database
const url = 'mongodb://localhost/node-api'
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database Connected')
}).catch(err => {
    console.log('Database error')
})


// middleware
app.use(express.json())

// routes
app.use('/api/articles', articlerouter)


app.listen(port, () => console.log(`Listening on port ${port}`));