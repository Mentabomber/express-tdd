const fs = require("fs");
const path = require("path");

module.exports = function (err, req, res, next) {
  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  res.format({
    json: () => {
      res.status(500).json({
        message: "Oops, mi sa che qualcosa è andato storto",
        error: err.message,
        errorInstance: err.name,
      });
    },
    default: () => {
      res.status(500).send("<h1>Oops, mi sa che qualcosa è andato storto</h1>");
    },
  });
};