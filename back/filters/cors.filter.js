// Enable Cross-Origin Resource Sharing
module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin, "
    + "Access-Control-Allow-Headers,"
    + "X-Requested-With,"
    + "Accept,"
    + "Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
}