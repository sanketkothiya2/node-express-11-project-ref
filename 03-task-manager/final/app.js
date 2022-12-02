const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './config.env') });
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const mongoose = require('mongoose');
// middleware

app.use(express.static('./public'));
app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected successfully...');
});

// const start = async () => {

//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () =>
//       console.log(`Server is listening on port ${port}...`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();
// console.log("🚀 ~ file: app.js:24 ~ start ~ start", start)


app.listen(port, () => console.log(`Listening on port ${port}.`));