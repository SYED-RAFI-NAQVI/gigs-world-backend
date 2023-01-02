const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  description: String,
  projectSize: String,
  requestedTime: String,
  clientLocation: String,
  clientName: String,
  clientSector: String,
  companySize: String,
  domain: String,
  requestedTime: String,
  email: String,
  username: String,
});

const ClientInfo = mongoose.model("ClientInfo", clientSchema);

module.exports = ClientInfo;
