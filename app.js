require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

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

// app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
}));

app.use(express.static('./public'))
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())

// app.get('/', (req, res) => {
//   res.send('<h1>Orders API</h1><a href="/api-docs">Documentation</a>')
// })

app.use('api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/items',authhenticateUser, itemRouter)
app.use('/api/v1/orders',authhenticateUser, orderRouter)




app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

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
