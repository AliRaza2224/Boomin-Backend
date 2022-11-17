const db = {
  username: "ali_raza",
  password: "HA513897",
  database: "boomin",
  cluster: "cluster0",
};

const uri = `mongodb+srv://${db.username}:${db.password}@${db.cluster}.ukxrsti.mongodb.net/${db.database}?retryWrites=true&w=majority`;




module.exports = uri;
