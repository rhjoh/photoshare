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
app.options("/delete", cors(corsOptions));
app.options("/favourite", cors(corsOptions));
app.options("/albumsave", cors(corsOptions));

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

app.get("/photos/album/:albumid", (req, res) => {
  console.log("GET request on /photos/album/:albumid");
  const albumID = req.params.albumid;
  let resultObject = {};

  const selectQuery = "SELECT * FROM photo_main where album_id = ?";
  connection.query(selectQuery, [albumID], function (err, results) {
    resultObject = results;
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    });
    res.send(resultObject);
    res.end();
  });
});

// Gets the filename so the client can make <img> requests.
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
    isfavourite: 0,
    albumID: 0,
  };

  const insert_query =
    "INSERT INTO photo_main VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
      imageObject.isfavourite,
      imageObject.albumID,
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

  const updateQuery = "UPDATE photo_main SET title = ?, description = ?, tagobj = ? WHERE id = ?";
  connection.query(
    updateQuery,
    [req.body.title, req.body.description, req.body.tagobj, req.body.id], 
    function (err, row, fields) {
      console.log(err);
    }
  );

  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.send("Done");
});

app.post("/favourite", bpJson, (req, res) => {
  console.log("Hit fav endpoint");
  const updateQuery = "UPDATE photo_main SET isfavourite = ? where id = ?";
  connection.query(
    updateQuery,
    [req.body.isFav, req.body.id],
    function (err, row, fields) {
      console.log(err);
    }
  );
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.send("Done.");
});
app.post("/delete", bpJson, (req, res) => {
  const deleteQuery = "DELETE FROM photo_main WHERE id = ?";
  console.log(req.body);
  connection.query(deleteQuery, [req.body.id], function (err, row, fields) {
    console.log(err);
  });
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.send("Done");
});
app.post("/albumsave", bpJson, (req, res) => {
  console.log(req.body);
  const updateQuery = "UPDATE photo_main SET album_id = ? where id = ?";
  connection.query(
    updateQuery,
    [req.body.albumID, req.body.id],
    function (err, row, fields) {
      console.log(err);
    }
  );
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  res.send("Done");
});
app.listen(8000, () => {
  console.log("Express listening on 8000");
});
