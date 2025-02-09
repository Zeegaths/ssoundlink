import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xYourContractAddress";
const CONTRACT_ABI = [
  "function createProfile(tuple(uint8 role, string farcaster_id, string[] genres)) public",
];

const useCreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [success, setSuccess] = useState(false);

  const createProfile = async (role, farcasterId, genres) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Check if the Ethereum provider is available
      if (!window.ethereum) {
        throw new Error("No Ethereum provider found");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Call the createProfile function
      const tx = await contract.createProfile({
        role: role, // Role: 0 = none, 1 = producer, 2 = collector
        farcaster_id: farcasterId,
        genres: genres,
      });

      setTxHash(tx.hash);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        // Transaction was successful
        setSuccess(true);
        console.log("Profile created successfully:", receipt);
      } else {
        throw new Error("Transaction failed. Please try again.");
      }
    } catch (err) {
      console.error("Error creating profile:", err);
      setError(err.message || "An error occurred while creating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return { createProfile, loading, error, txHash, success };
};

export default useCreateProfile;
