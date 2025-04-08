const { JWT_SECRET = "dev-secret-key" } = process.env;
const isProduction = process.env.NODE_ENV === "production";
const { dataBase = "mongodb://127.0.0.1:27017/newsExplorer_db" } = process.env;
if (isProduction && !JWT_SECRET) {
  throw new Error("JWT_SECRET is required in production mode");
}
module.exports = { JWT_SECRET, dataBase };
