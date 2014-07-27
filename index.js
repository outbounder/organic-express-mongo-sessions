var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var _ = require("underscore")

module.exports = function(plasma, dna) {
  plasma.on(dna.reactOn, function(c){
    var app = c.data || c[0].data
    var sessionStore = new MongoStore(_.extend({db: dna.db}, dna["connect-mongo"]), function(e){
      app.use(session(_.extend({
        secret: dna.cookie_secret,
        store: sessionStore
      }, dna["express-session"])));
      plasma.on(dna.closeOn || "kill", function(){
        sessionStore.db.close()
      })
      if(dna.emitReady)
        plasma.emit({
          type: dna.emitReady,
          data: sessionStore
        })
    })
  })
}