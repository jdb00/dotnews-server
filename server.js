const express= require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))

//set up route
var router = express.Router();
 
router.get('/testing', (req, res) => {
  res.send('<h1>Testing is working asldkfja;sldfj</h1>')
})

//use server to serve route
app.use('/api', router);

//launch our backend into a port
const apiPort = 3001;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));
