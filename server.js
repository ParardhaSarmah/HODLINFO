const https = require("https");
const fs = require("fs");
const Pool = require("./pg");
const app = require("./app");
var options = {
  host: "api.wazirx.com",
  path: "/api/v2/tickers/",
  method: "GET",
};
var data = "";
const entries = https.get(options, (res) => {
  console.log(res.statusCode);
  res.on("data", (d) => {
    data += d.toString();
  });
  res.on("end", () => {
    // fs.writeFile("data.json", data, () => {});
    data = JSON.parse(data);
    Object.keys(data)
      .slice(0, 10)
      .forEach((el) => {
        pool
          .query("SELECT * FROM coins WHERE name=$1", [data[el].name])
          .then((results) => {
            // console.log(data[el].name);
            if (!results.rowCount) {
              console.log(`Adding for ${data[el].name}`);
              pool
                .query(
                  "INSERT INTO coins (name, last, buy, sell, volume, base_unit) VALUES ($1,$2,$3,$4,$5,$6)",
                  [
                    data[el].name,
                    data[el].last,
                    data[el].buy,
                    data[el].sell,
                    data[el].volume,
                    data[el].base_unit,
                  ]
                )
                .then((results) => {})
                .catch((err) => {
                  if (err) {
                    throw err;
                  }
                });
            } else {
              console.log(`Updating for ${data[el].name}`);
              pool
                .query(
                  "UPDATE coins SET last=$2, buy=$3,sell=$4,volume=$5,base_unit=$6 WHERE name=$1",
                  [
                    data[el].name,
                    data[el].last,
                    data[el].buy,
                    data[el].sell,
                    data[el].volume,
                    data[el].base_unit,
                  ]
                )
                .then((results) => {
                  // console.log(results.rowCount);
                })
                .catch((err) => {
                  if (err) {
                    throw err;
                  }
                });
            }
          })
          .catch((error) => {
            if (error) {
              throw error;
            }
          });
      });
  });
});
entries.end();
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
