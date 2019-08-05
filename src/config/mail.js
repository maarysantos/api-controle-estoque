const dotenv = require('dotenv').config();

module.exports = {
  "host": process.env.MAIL_HOST,
  "port": process.env.MAIL_PORT,
  "secure": "false",
  "user": process.env.MAIL_USER,
  "pass": process.env.MAIL_PASS
}
