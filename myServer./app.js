const express = require('express')
const app = express()
const fs = require('fs')
var cors = require('cors')
const { errorMonitor } = require('events')
// const bp = require('body-parser')
app.use(express.json())
// app.use(bp.urlencoded({ extended: true }))

app.use(cors())
app.get('/', function(req, res) {
    const file = fs.readFileSync('historyGames.json');
    const history = JSON.parse(file); // back to object
   res.send(history)
  });

app.post('/', function(req, res) {
    const file = fs.writeFileSync('historyGames.json', JSON.stringify(req.body),(err)=>{
      if(err) throw err;
      console.log('added data');
    });
    res.send("ok");
});

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next(createError(404));
  });
  
app.listen(8080, function() {
  console.log('Example app listening on port 3001!');
});

module.exports = app;
  
