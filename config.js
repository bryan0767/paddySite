const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  adminSecret: process.env.SECRET,
  db: process.env.DB,
  port:process.env.PORT,
  service:process.env.SERVICE,
  email:process.env.EMAIL,
  pass:process.env.PASS
};
