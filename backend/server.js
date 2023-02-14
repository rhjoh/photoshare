const express = require("express");
const multer = require("multer");
const uuid = require("uuid");
const mysql = require("mysql2");
const cors = require("cors");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "photo_app_user",
  password: "password1",
  database: "photo_app",
});
const storageOpts = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Users/rhysjohnston/Development/photo-app/backend/photos");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storageOpts });
const fs = require("fs");
const bp = require("body-parser");
const path = require("path");
const { query } = require("express");
const app = express();

const bpJson = bp.json();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.options("/update", cors(corsOptions));

app.get("/", (req, res) => {
  console.log("GET at /");
});

app.get("/photos", (req, res) => {
  console.log("GET request on /photos");

  let resultObject = {};
  const selectQuery = "SELECT * FROM photo_main";
  const queryResult = connection.query(selectQuery, function (err, results) {
    // Response logic in here because we're waiting for the db result.
    resultObject = results;
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    });
    res.send(resultObject);
    res.end();
  });
});

app.get("/photos/:filename", (req, res) => {
  const filename = req.params.filename;
  if (fs.existsSync("photos/" + filename)) {
    res.sendFile(__dirname + "/photos/" + filename);
  } else {
    console.log("File not found");
  }
});

app.post("/upload", upload.single("fileUpload"), (req, res, next) => {
  console.log(req.file);

  let imageObject = {
    imageID: uuid.v4(),
    filename: req.file.filename,
    imagesize: req.file.size,
    imageTitle: req.body.imageTitle,
    username: null,
    submitDate: new Date(),
    groupID: null,
    tagObj: null,
  };

  const insert_query =
    "INSERT INTO photo_main VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    insert_query,
    [
      null,
      imageObject.imageID,
      imageObject.imageTitle,
      imageObject.imagesize,
      imageObject.filename,
      imageObject.username,
      imageObject.submitDate,
      imageObject.groupID,
      imageObject.tagObj,
    ],
    function (err, row, fields) {
      console.log(err);
    }
  );

  console.log(imageObject);

  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.send("Hit upload route");
});

app.post("/update", bpJson, (req, res) => {
  console.log("POST on /update ");
  console.log(req.body);

  const updateQuery = "UPDATE photo_main SET tagobj = ? WHERE id = ?";
  connection.query(
    updateQuery,
    [req.body.imgTags, req.body.id],
    function (err, row, fields) {
      console.log(err);
    }
  );

  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.send("Done");
});
app.listen(8000, () => {
  console.log("Express listening on 8000");
});

// update photo_main set tagobj = "1234 - test"  where ID = 7;
