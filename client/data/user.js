import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import {  toHex } from "ethereum-cryptography/utils";

const ACCOUNT_KEYS = new Map([
    [
      "Vitalik",
      {
        private:
          "5d177100940db113e3081adc997b0f4a840abfa2c917fb33b2a791aa10759c69",
        public:
          "045c66020e9bea82d7d162d0b9aa2f286fbad44908f9cdb4884ffe03925955c01d46ee4f201fee99d6edfd360ad5b90f2d55f457abb4866e3c5870c65fa8fd8406",
        address:
            "6fdf710c289a01b94914591e3113b5ffbd1a564d"
      },
    ],
    [
      "Elon",
      {
        private:
          "bca645f36b49e116ebd4c2e17db2ae0716b8c0aa6d2c3baa1b3f72706037999d",
        public:
          "040adbc8df6be744a7450dea656e251d8c588d76838fdfa008480f817ce81548c3e1ce5c939fe4ba757efafeecb9281111d7e48f2bd095593d184b8898c7517c52",
        address:
          "61d503652224f40df6a771402ccea30854ff0957"

      },
    ],
    [
      "CZ",
      {
        private:
          "4d2acaa90a186711ad6e371e9a241b40d226b6b11fdcb61d73bae6c3c2984d38",
        public:
          "04c674d5343a29d860aa1fd97e6e56300005cee171b3d9b0509d66d46cd29bb628538706bb31126c7a40c67bb5e3b13b98b234d4081cb7815977e11bbcb9d696cb",
        address:
          "6eba4e10c1ba5b5e5712397a3d569fef9eb76483"
      },
    ],
  ]);


  const USERS = Array.from(ACCOUNT_KEYS.keys());


  const getPrivateKeyByIndex = (index) => {
    if (!index) return null;
    return ACCOUNT_KEYS.get(index).private;
  };    

  const getPublicKeyByIndex = (index) => {
    if (!index) return null;
    return ACCOUNT_KEYS.get(index).public;
  };   

  const hashMessage = (message) => keccak256(Uint8Array.from(message));
  
  const signin = async (username, message) => {
    const privateKey = getPrivateKeyByIndex(username);
    const hash = hashMessage(message);
  
    const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
      recovered: true,
    });
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    return toHex(fullSignature);
  };

  const user = {
    USERS,
    getPrivateKeyByIndex,
    getPublicKeyByIndex,
    hashMessage,
    signin

  };



  export default user;
  