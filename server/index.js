const express = require("express");
const cors = require("cors");
const app = express();
const fileupload = require("express-fileupload");

const mysqlx = require("@mysql/xdevapi");
var myTable;

app.use(cors());
app.use(fileupload());
app.use(express.static("upload"));

app.use(express.json());

app.post("/api/upload", (req, res) => {
  const newpath = __dirname + "/upload/";
  const file = req.files.file;
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }
    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
});

app.post("/api/insert", (req, res) => {
  console.log("req.body >> ", req.body);

  mysqlx
    .getSession({
      host: "localhost",
      user: "root",
      password: "root",
      port: 33060,
    })
    .then(function (session) {
      // Accessing an existing table
      myTable = session.getSchema("riteshdb").getTable("registration_form");

      // Insert SQL Table data
      return myTable
        .insert([
          "fname",
          "lname",
          "email",
          "phone",
          "qualification",
          "address",
          "document",
        ])
        .values([
          req.body.fname,
          req.body.lname,
          req.body.email,
          req.body.phone,
          req.body.qualification,
          req.body.address,
          req.body.document,
        ])
        .execute();
    });
  res.send({ success: true, message: "Table done" });
});

app.listen(5000, () => {
  console.log("running on port 5000");
});
