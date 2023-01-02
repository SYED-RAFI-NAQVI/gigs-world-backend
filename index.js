const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ClientInfo = require("./models/Client");

const app = express();
const uri = "mongodb+srv://admin:admin@cluster0.hnlqilh.mongodb.net/test";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.get("/", async function (req, res) {
  res.send("hello");
});

app.get("/getinfo", async (req, res) => {
  const { email } = req.query?.user;
  const result = await ClientInfo.aggregate([
    {
      $match: {
        email,
      },
    },
  ]);
  res.send(result);
});

app.post("/clientinfo", async (req, res) => {
  const {
    clientLocation,
    clientName,
    clientSector,
    companySize,
    description,
    projectSize,
    requestedTime,
    domain,
    email,
    username,
  } = req.body;

  ClientInfo.create(
    {
      clientLocation,
      clientName,
      clientSector,
      companySize,
      description,
      projectSize,
      requestedTime,
      domain,
      email,
      username,
    },
    (error, item) => {
      if (error) {
        res.send(error);
      } else {
        res.send({ item, saved: true });
      }
    }
  );
});

const PORT = 8000;
const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});
