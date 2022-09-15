import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { useState } from "react";

// Your smart contract address here
const contractAddress = "0xB08BD1aa7Ee2291c60CE7FfcA4A070Fe2c5936F5";

export default function Home() {
  // Get the smart contract
  const { contract } = useContract(
    "0xB08BD1aa7Ee2291c60CE7FfcA4A070Fe2c5936F5"
  );

  // Read the current greeting
  const { data: currentGreeting, isLoading } = useContractRead(
    contract,
    "greet"
  );

  // Store the new greeting the user enters in the input in state
  const [newGreeting, setNewGreeting] = useState("");

  return (
    <div>
      {/* Display current greeting */}
      <p>
        Current greeting: <b>{isLoading ? "Loading..." : currentGreeting}</b>
      </p>

      {/* Add a new greeting */}
      <input
        type="text"
        value={newGreeting}
        className="input"
        onChange={(e) => setNewGreeting(e.target.value)}
      />

      <Web3Button
        contractAddress={contractAddress}
        action={(contract) => contract.call("setGreeting", newGreeting)}
        colorMode="light"
        accentColor="#F213A4"
      >
        Set Greeting
      </Web3Button>
    </div>
  );
}
