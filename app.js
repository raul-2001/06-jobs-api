require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();


//connection
const connectDB = require('./db/connect')
const authhenticateUser = require('./middleware/authentication')

// router
const authRouter = require('./routes/auth')
const itemRouter = require('./routes/items')
const orderRouter = require('./routes/orders')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(express.json());
// extra packages


// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/items',authhenticateUser, itemRouter)
app.use('/api/v1/orders',authhenticateUser, orderRouter)




app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
