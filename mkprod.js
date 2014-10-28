var moonbootsConfig = require('./moonbootsConfig');
var moonboots = require('moonboots');

moonbootsConfig.moonboots.buildDirectory = 'build';
var mb = new moonboots(moonbootsConfig.moonboots);
mb.build();
