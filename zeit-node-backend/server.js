const express = require('express');
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const http = require('http');
const morgan = require('morgan');
const path = require('path');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
// SETUP DB CONNECTION
connectDB();

// Middlewares
const logger = require('./middleware/logger');

const app = express();

// Body parser
app.use(express.json({ limit: '50mb' }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10000
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

//
// TODO
// ADD CORS WHITELIST
//

// Enable CORS
app.use(cors());

// Set static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// const server = app.listen(
//   PORT,
//   console.log(
//     `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}!`.blue
//       .bold
//   )
// );

const { setRouter } = require('./route');

/**
 * Setup an express server and define port to listen all incoming requests for this application
 */
const setUpExpress = () => {
  // create server
  app.server = http.createServer(app);

  app.disable('x-powered-by');

  // routes
  setRouter(app);

  app.use(errorHandler);

  // start server
  app.server.listen(PORT, () => {
    console.log(
      `Started server on => http://localhost:${
        app.server.address().port
      } for Process Id ${process.pid}`
    );
  });
};

setUpExpress();
