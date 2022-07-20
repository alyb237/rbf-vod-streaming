module.exports = function setPostgresDefaultsOnHeroku() {
  if (process.env.DATABASE_URL) {
    // Install pg-connection-string
    const { parse } = require('pg-connection-string');

    // Extract the connection information from the Heroku environment variable
    const {
      host,
      database,
      user,
      password,
      stripeKey,
      publishableKey,
      priceTwo,
      methodTypes,
      videoOne,
      videoTwo,
      videoThree,
      videoFour,
      videoFive,
      videoSix,
      videoSeven,
    } = parse(process.env.DATABASE_URL);

    // Set standard environment variables
    process.env.PGHOST = host;
    process.env.PGDATABASE = database;
    process.env.PGUSERNAME = user;
    process.env.PGPASSWORD = password;
    process.env.STRIPE_SECRET_KEY = stripeKey;
    process.env.STRIPE_PUBLISHABLE_KEY = publishableKey;
    process.env.PRICE2 = priceTwo;
    process.env.PAYMENT_METHOD_TYPES = methodTypes;
    process.env.VIDEO_1 = videoOne;
    process.env.VIDEO_2 = videoTwo;
    process.env.VIDEO_3 = videoThree;
    process.env.VIDEO_4 = videoFour;
    process.env.VIDEO_5 = videoFive;
    process.env.VIDEO_6 = videoSix;
    process.env.VIDEO_7 = videoSeven;
  }
};
