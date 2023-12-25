const threadRouter = require('./threads');

function route(app){
  app.use('/threads', threadRouter);
}

module.exports = route;
