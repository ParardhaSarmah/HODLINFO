pool = require("./../pg");
exports.getcoininfo = async (req, res) => {
  try {
    pool.query("SELECT * FROM coins").then((result) => {
      console.log(JSON.stringify(result.rows));
      res.status(200).json({
        data: JSON.stringify(result.rows),
      });
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
