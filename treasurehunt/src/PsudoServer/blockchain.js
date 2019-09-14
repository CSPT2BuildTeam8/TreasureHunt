const blockchain = require("./axiosConfigBlockchain");
const shajs = require("sha.js");

hash = str => {
  return shajs("sha256")
    .update(str)
    .digest("hex");
};

valid_proof = (lastProof, proof, difficulty) => {
    const guess = hash(`${lastProof}${proof}`);
  
    let leading_zeroes = "";
    for (let i = 0; i < difficulty; i++) {
      leading_zeroes += 0;
    }
  
    return guess.startsWith(leading_zeroes);
  };

getLastProof = () => {
  let last_proof = "";
  console.log(last_proof);
};

module.exports = getLastProof;