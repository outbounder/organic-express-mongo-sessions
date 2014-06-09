var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function(plasma, dna) {
  plasma.on(dna.reactOn, function(c){
    var app = c.data || c[0].data

    var sessionStore = new MongoStore({db: dna.db});
    app.use(session({
      secret: dna.cookie_secret,
      store: sessionStore
    }));
    if(dna.emitReady)
      plasma.emit({
        type: dna.emitReady,
        data: sessionStore
      })
  })
}