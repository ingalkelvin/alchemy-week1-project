const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const mainF = require("./scripts/main");

app.use(cors());
app.use(express.json());

const balances = {
  "045c66020e9bea82d7d162d0b9aa2f286fbad44908f9cdb4884ffe03925955c01d46ee4f201fee99d6edfd360ad5b90f2d55f457abb4866e3c5870c65fa8fd8406": 100,
  "040adbc8df6be744a7450dea656e251d8c588d76838fdfa008480f817ce81548c3e1ce5c939fe4ba757efafeecb9281111d7e48f2bd095593d184b8898c7517c52": 50,
  "04c674d5343a29d860aa1fd97e6e56300005cee171b3d9b0509d66d46cd29bb628538706bb31126c7a40c67bb5e3b13b98b234d4081cb7815977e11bbcb9d696cb": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  
  //TODO: get a signature from the client-side server application
  //recover the public address from the signature 
  
  const { message, signature } = req.body;
  const { recipient, amount } = message;

  const sender = mainF.signatureToPublicKey(message, signature);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!"+sender+" "+amount });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
