const express= require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
var mongoose = require('mongoose')


var connectionString = 'mongodb://admin:password321@cluster0-shard-00-00.jqrc6.mongodb.net:27017,cluster0-shard-00-01.jqrc6.mongodb.net:27017,cluster0-shard-00-02.jqrc6.mongodb.net:27017/reactnews?ssl=true&replicaSet=atlas-eor8ds-shard-0&authSource=admin&retryWrites=true&w=majority'


var Article = require('./article-model')

mongoose.connect(connectionString,{ useNewUrlParser: true })
var  db = mongoose.connection
db.once('open', () => console.log('Database connected'))
db.on('error', () => console.log('Database error'));

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))

//set up route
var router = express.Router();
 
router.get('/testing', (req, res) => {
  res.send('<h1>Testing asldkfja;sldfj</h1>')
})

//get all articles
router.get('/articles', (req, res) => {
  Article.find()
  .then((articles) => {
      res.json(articles);
  })
})

//get article by id
router.get('/articles/:id', (req, res) => {
  Article.findOne({id:req.params.id})
  .then((articles) => {
      res.json(articles);
  })
})

//post new article
router.post('/articles', (req, res) => {
  var article = new Article()
  article.id = Date.now()
  var data = req.body

  Object.assign(article, data)

  article.save()
  .then((article) => {
    res.json(article)
  })
})

//edit existing articleby id
router.put('/articles/:id', (req, res) => {
 
  Article.findOne({id:req.params.id})
  .then((article) => {
      var data = req.body
      Object.assign(article,data)
      return article.save()   
  })
  .then((article) => {
       res.json(article)
  })
})

//delete article by id - soft or hard delete?


//use server to serve route
app.use('/api', router);

//launch our backend into a port
const apiPort = 4000;
app.listen(apiPort, () => console.log('Listening on port '+ apiPort));


