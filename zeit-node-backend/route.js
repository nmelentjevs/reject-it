// Route files
const claims = require('./routes/claims');

exports.setRouter = app => {
  // Mount routers
  app.use('/claims', claims);
};
