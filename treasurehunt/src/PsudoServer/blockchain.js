const server = require("./axios_config_blockchain");
const shajs = require("sha.js");

hash = str => {
  return shajs("sha256")
    .update(str)
    .digest("hex");
};

valid_proof = () => {};

getLastProof = () => {
  let last_proof = "";
  console.log(last_proof);
};

module.exports = getLastProof;