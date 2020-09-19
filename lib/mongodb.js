const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@pokemon-cards.99cuv.mongodb.net?retryWrites=true&w=majority`;

export default () => new MongoClient(uri, { useUnifiedTopology: true });
