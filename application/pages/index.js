import {
  useAddress,
  useDisconnect,
  useMetamask,
  useContract,
  useNetwork,
  useNetworkMismatch,
  ChainId,
} from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const isWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Get the smart contract
  const { contract } = useContract(
    "0xB08BD1aa7Ee2291c60CE7FfcA4A070Fe2c5936F5"
  );

  // Function to read the greeting from the blockchain
  const [currentGreeting, setCurrentGreeting] = useState("");

  // Read the greeting from the contract
  useEffect(() => {
    async function readGreeting() {
      const msg = await contract?.call("greet");
      setCurrentGreeting(msg);
    }

    if (contract) {
      readGreeting();
    }
  }, [contract]);

  // Store the new greeting the user enters in the input in state
  const [newGreeting, setNewGreeting] = useState("");

  // Function to write the new greeting to the blockchain
  async function writeGreeting() {
    if (!address) return;

    if (isWrongNetwork) {
      switchNetwork(ChainId.Goerli);
    }

    await contract?.call("setGreeting", newGreeting);
  }

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet} className="btn2">
            Disconnect Wallet
          </button>

          {/* Display current greeting */}
          <p>
            Current greeting: <b>{currentGreeting}</b>
          </p>

          {/* Add a new greeting */}
          <input
            type="text"
            value={newGreeting}
            className="input"
            onChange={(e) => setNewGreeting(e.target.value)}
          />
          <button onClick={writeGreeting} className="btn">
            Write Greeting
          </button>
        </>
      ) : (
        <button onClick={connectWithMetamask} className="btn">
          Connect Wallet
        </button>
      )}
    </div>
  );
}
