var express = require ('express'),
    app = express(),
    port = process.env.PORT || 3000
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Tododb', {useMongoClient: true})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// importing the routes
const taskRoute = require('./api/routes/todoListRoutes');
app.use('/tasks', taskRoute);

app.listen(port, ()=>{
console.log('todo list RESTful API server started on: ' + port)
})