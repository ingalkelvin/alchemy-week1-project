import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import userData from "./../data/user";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey,  userSelected, setUserSelected }) {

  async function onChange(evt) {
    userSelected = evt.target.value
    setUserSelected(userSelected);
    const privateKey =  userData.getPrivateKeyByIndex(userSelected);
    setPrivateKey(privateKey);
    const address = toHex(secp.getPublicKey(privateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Users:
        <select value={privateKey} onChange={onChange}>

        <option>--- please choose a user wallet ---</option>
          {userData.USERS.map((key, index) => (
            <option 
            key={index} value={key}>
              {key}
            </option>
          ))}

        </select>
      </label>

      <div className="user">
        User:  {userSelected}
      </div>

      <div className="address">
        Address:  {address.slice(0,10)}...
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
