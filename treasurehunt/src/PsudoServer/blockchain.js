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
  
  blockchain
  .get("last_proof/")
  .then(res => {
    last_proof = JSON.stringify(res.data.proof);
    let difficulty = res.data.difficulty;
    let proof = 8675309;

    console.log("Successfully made a last_proof request!");

    while (!valid_proof(last_proof, proof, difficulty)) {
      proof = Math.floor(Math.random() * 1000000000);
    }

    console.log("Found a valid proof!");

    setTimeout(() => {
      blockchain
        .post("mine/", { proof: proof })
        .then(res => {
          console.log("Succesfully mined!");
        })
        .catch(err => console.log("Error mining: ", err));
    }, 10 * 1000);
  })
  .catch(err => console.log("Error processing the last_proof request:", err));
};

module.exports = getLastProof;