import { useState } from "react";
import server from "./server";
import userData from "./../data/user";

function Transfer({ userSelected, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const message = {
      amount: parseInt(sendAmount),
      recipient: userData.getPublicKeyByIndex(recipient),
    };

    //console.log(userSelected);

    const signature = await userData.signin(userSelected, message);

    const transaction = {
      message,
      signature,
    };

    try {
      const {
        data: { balance },
      } = await server.post(`send`, transaction);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient

        <select value={recipient} onChange={setValue(setRecipient)}>
        
          <option value="">--- please choose a user wallet ---</option>
          {userData.USERS.map((key, index) => (
            <option 
            key={index} value={key}>
              {key}
            </option>
          ))}

        </select>


      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
