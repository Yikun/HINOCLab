/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , markdown=require('markdown-js')
  , fs = require('fs');

var app = express();
var MongoStore = require('connect-mongo')(express);

var settings = require('./settings');
// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon(__dirname+'/public/logo.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: settings.cookieSecret,
    store: new MongoStore({
      db: settings.db
    })
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.engine('md', function(path, options, fn){  
  fs.readFile(path, 'utf8', function(err, str){  
    if (err) return fn(err);  
    str = markdown.parse(str).toString();  
    fn(null, str);  
  });
});

// Routes

app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/about', routes.about);
app.get('/report', routes.report);
app.get('/submit', routes.getsubmit);
app.post('/submit', routes.postsubmit);
app.get('/login', routes.getlogin);
app.post('/login', routes.postlogin);

app.get('/logout', routes.logout);

app.post('/modify', routes.modify);
app.get('/login', routes.getlogin);

app.get('/doc/:author/:title', routes.getdoc);

app.get('/doc', routes.getdocindex);

app.get('/xxx', function(req, res) {  
    console.log('404 handler..')  
    res.render('404', {  
        status: 404,  
        title: 'NodeBlog',
        user: req.session.user  
    });  
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

