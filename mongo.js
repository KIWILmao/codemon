const MongoClient = require("mongodb").MongoClient

const client = new MongoClient(
  "mongodb+srv://shubham1173:codemon1173@codemon.8ir7cvy.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

async function connectDb() {
  await client.connect()
  return client.db("codemon")
}

module.exports = { connectDb }
