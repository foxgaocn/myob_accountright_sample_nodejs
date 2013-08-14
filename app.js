var port = process.env.PORT || 8899;
console.log("port is " + port);

var clientId = process.env.MYOBAPI_SAMPLE_CLIENTKEY || 'zwbmgxyzjrtxcnw3yam92ah6';
var clientSecret = process.env.MYOBAPI_SAMPLE_CLIENTSECRET || 'J6yGzqxJJWXp2RMBujdzxWwM';
var redirectUri = process.env.MYOBAPI_REDIRECTURI || 'http://http://mighty-thicket-3094.herokuapp.com//authorized';
 
var express = require('express')
  , routes = require('./routes')
  , authorized = require('./routes/authorized')
  , companyfiles = require('./routes/companyfiles')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  var MemoryStore = require('connect').session.MemoryStore;
  app.set('port', port);
  app.set('myob credentials', {clientId: clientId, clientSecret: clientSecret, redirectUri: redirectUri});
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret:'sea-anemone',
    store: new MemoryStore({ 
        reapInterval: 60000 * 10
      })
    }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
 
app.get('/', routes.index);
app.get('/authorized', authorized.authorized);
app.get('/companyfiles', companyfiles.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
