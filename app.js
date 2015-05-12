var fs = require('fs');

cordova('log').call("JXcore is up and running!");

cordova('getBuffer').registerSync(function() {
  console.log("getBuffer is called!!!");
  var buffer = new Buffer(25000);
  buffer.fill(45);

  // send back a buffer
  return buffer;
});

cordova('asyncPing').registerAsync(function(message, callback){
  setTimeout(function() {
    callback("Pong:" + message);
  }, 500);
});

//// requiring a node module
//var jsnice = require('json-nice');
//
////using it
//var obj = { a:1, b:2 };
//console.log(jsnice(obj));

console.log("__filename", __filename);

console.log("__dirname", __dirname);

console.log("process", process);

// execpath
console.log("execPath", process.execPath);

// cwd
console.log("process.cwd", process.cwd());

// userPath
console.log("process.userPath", process.userPath);

// iOS user directory
console.log("userPath", fs.readdirSync(process.userPath));

//cordova('fromJXcore').registerToNative(function(param1, param2){
//  // this method is reachable from Java or ObjectiveC
//  // OBJ-C : [JXcore callEventCallback:@"fromJXcore" withParams:arr_parms];
//  // Java  : jxcore.CallJSMethod("fromJXcore", arr_params);
//});
//
//// calling this custom native method from JXcoreExtension.m / .java
//cordova('ScreenInfo').callNative(function(width, height){
//  console.log("Size", width, height);
//});
//
//cordova('ScreenBrightness').callNative(function(br){
//  console.log("Screen Brightness", br);
//});


console.log("Starting rendr...");
console.log("loading express...");
var express = require('express');
console.log("loading rendr...");
var rendr = require('rendr');
console.log("loading config");
var config = require('config')
    , compress = require('compression')
    , bodyParser = require('body-parser')
    , serveStatic = require('serve-static')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , mw = require('./server/middleware')
    , app = express();

/**
 * Initialize Express middleware stack.
 */
console.log("Initialize Express middleware stack.");
app.use(compress());
app.use(serveStatic(__dirname + '/public'));
app.use(bodyParser.json());

/**
 * The `cookieParser` middleware is required for sessions.
 */
console.log("The `cookieParser` middleware is required for sessions.");
app.use(cookieParser());

/**
 * Add session support. This will populate `req.session`.
 */
console.log("Add session support. This will populate `req.session`.");
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true
}));

/**
 * Initialize our Rendr server.
 */
console.log("Initialize our Rendr server.");
var server = rendr.createServer({
  dataAdapterConfig: config.api
});

/**
 * To mount Rendr, which owns its own Express instance for better encapsulation,
 * simply add `server` as a middleware onto your Express app.
 * This will add all of the routes defined in your `app/routes.js`.
 * If you want to mount your Rendr app onto a path, you can do something like:
 *
 *     app.use('/my_cool_app', server);
 */
app.use('/', server.expressApp);

server.configure(function(rendrExpressApp) {

  /**
   * Allow the Rendr app to access session data on client and server.
   * Check out the source in the file `./server/middleware/initSession.js`.
   */
  rendrExpressApp.use(mw.initSession());

  /**
   * Increment a counter in the session on every page hit.
   */
  rendrExpressApp.use(mw.incrementCounter());
});

/**
 * Start the Express server.
 */
function start(){
  var port = process.env.PORT || config.server.port;
  app.listen(port);
  console.log("server pid %s listening on port %s in %s mode",
      process.pid,
      port,
      app.get('env')
  );
}


/**
 * Only start server if this script is executed, not if it's require()'d.
 * This makes it easier to run integration tests on ephemeral ports.
 */
if (require.main === module) {
  start();
}

exports.app = app;


cordova('asyncSeverStarted').registerAsync(function(message, callback){
  function poll(){
    setTimeout(function() {
      if(typeof exports.app != 'undefined') {
        callback("Pong:" + message);
      } else {
        poll();
      }
    }, 250);
  }
  poll();
});