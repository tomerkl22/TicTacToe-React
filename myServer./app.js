const express = require('express')
const app = express()
const fs = require('fs')
var cors = require('cors')
const { errorMonitor } = require('events')
app.use(express.json())
app.use(cors())
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());

const mongoUrl = 'mongodb://localhost:27017/tictactoe';

app.put('/update-data/', async (req, res) => {
  const newData = req.body; 
  const client = new MongoClient(mongoUrl);

  if (Object.keys(newData).length != 0){
    try {
      await client.connect();

      const db = client.db();
      const collection = db.collection('games');
      
      //console.log(newData)
      await collection.insertOne( newData );

      res.status(200).send('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      client.close(); // Close the MongoDB connection
    }
  }
});



  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next(createError(404));
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  


module.exports = app;
  
