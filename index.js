//const container = require('./container');

const app = require('./config/server');

const application = new app();

application
    .start();