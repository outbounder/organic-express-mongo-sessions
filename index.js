var Session = require('express-session');
var MongoStore = require('connect-mongo')(Session);
var _ = require("underscore")

module.exports = function(plasma, dna) {
  plasma.on(dna.reactOn, function(c){
    var app = c.data || c[0].data
    var sessionStore = new MongoStore(_.extend({db: dna.db}, dna["connect-mongo"]))
    sessionStore.once('connected', function(){
      if(dna.emitReady)
        plasma.emit({
          type: dna.emitReady,
          data: sessionStore,
          session: session
        })
    })

    var session = Session(_.extend({
      secret: dna.cookie_secret,
      store: sessionStore,
      saveUninitialized: true,
      resave: true
    }, dna["express-session"]));

    app.use(session);

    plasma.on(dna.closeOn || "kill", function(c, next){
      // close db connection
      sessionStore.db.close(function(){
        // workaround to notify express session that its sessionStore has closed db connection.
        sessionStore.emit("disconnected")
        next()
      })
    })
  })
}