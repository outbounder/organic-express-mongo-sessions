# organic-express-mongo-sessions

Organelle mounting `connect-mongo` middleware to express app chemical.

## dna

    {
      "source": "node_modules/organic-express-mongo-sessions",
      "reactOn": "ExpressServer",
      "emitReady": "ExpressSessions",
      "cookie_secret": "secret",
      "db": "databaseName",
      "closeOn": "kill",
      "express-session": {} // optional, refer to https://github.com/expressjs/session options
      "connect-mongo": {} // optional, refer to https://github.com/kcbanner/connect-mongo options
    }

### `reactOn` property

Should be either `ExpressServer` chemical with [expected structure](https://github.com/outbounder/organic-express-server#emitready-chemical) or array of chemicals where the first one is mapped as `ExpressServer` chemical.

### `emitReady` property

Indicates the type of the chemical to be emitted once middleware is mounted, chemical has the following structure:

    {
      "type": "emitReadyValue",
      "data": MongoStore instance
    }