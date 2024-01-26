const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const route = require("./routes");
const MongoDBStore = require("connect-mongodb-session")(session);
const prometheus = require('prom-client');

require("dotenv").config();
const passportService = require("./services/passport");
const { PORT, MONGODB_URL_DEV,MONGODB_URL_PRODUCT, SECRET_KEY } = require("./config");
const { A_WEEK } = require("./constants");
const authRoutes = require("./routes/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Thêm metrics
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 3, 4, 5] // Example buckets, adjust as needed
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route.path, res.statusCode)
      .observe(duration / 1000); // Convert to seconds
  });
  next();
});

app.get('/metrics', async (req, res) => {
  try {
    const metrics = await prometheus.register.metrics();
    res.set('Content-Type', prometheus.register.contentType);
    res.send(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//Connect to mongodb atlas
const isDevelopment = process.env.NODE_ENV !== 'production';

let mongoDBURL;

if (isDevelopment) {
  mongoDBURL = MONGODB_URL_PRODUCT;
} else {
  mongoDBURL = MONGODB_URL_DEV;
}

mongoose
  .connect(mongoDBURL)
  .then(() => console.log(`Connected successfully to MongoDB Atlas for ${isDevelopment ? 'development' : 'production'}`))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

const store = new MongoDBStore({
  uri: mongoDBURL,
  collection: "sessions",
});

app.use(
  session({
    secret: SECRET_KEY,
    cookie: {
      maxAge: A_WEEK,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportService(passport);

app.use(authRoutes);
route(app);

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

module.exports = app;
if (isDevelopment) {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
} 
