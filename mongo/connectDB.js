const mongoose = require("mongoose");
const config = require("config");
let db = config.get("mongoURI");

const KubernetesSecret = require("./kubernetesSecrets");

const connectDb = async () => {
  await KubernetesSecret();

  if (
    process.env["MONGO_USERNAME"] &&
    process.env["MONGO_PASSWORD"] &&
    process.env["MONGO_CONNECTION_STRING"]
  ) {
    db =
      "mongodb://" +
      process.env["MONGO_USERNAME"] +
      ":" +
      process.env["MONGO_PASSWORD"] +
      "@" +
      process.env["MONGO_CONNECTION_STRING"] +
      "/?retryWrites=true&w=majority&directConnection=true";
    console.log(db);
  }
  try {
    console.log("Connecting to mongodb...");
    await mongoose.connect(db);
    console.log("DB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
