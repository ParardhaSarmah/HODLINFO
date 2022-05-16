const Pool = require("pg").Pool;
//add credentials
usr = "";
pwd = "";
db = "int_api";
hst = "localhost";
prt = 5432;
const pool = new Pool({
  user: usr,
  host: hst,
  database: db,
  password: pwd,
  port: prt,
});
module.exports = pool;
