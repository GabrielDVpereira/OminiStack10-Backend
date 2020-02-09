const express = require('express'); 
const mongoose = require('mongoose');
const app = express(); 
const routes = require('./routes');

mongoose.connect('mongodb+srv://oministack:gabriel299@cluster0-ldd1j.mongodb.net/week10?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

 app.use(express.json()); 
app.use(routes);

app.listen(3333);

