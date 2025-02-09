import { useCallback, useState } from "react";
import { parseEther, formatEther } from "ethers";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { getContract } from "viem";
import soundlinkABI from "../abis/Soundlink.json";

const useUploadBeats = () => {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [uploadedBeats, setUploadedBeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadBeat = useCallback(
    async (beatURI, coverURI, beatTitle, genre, price) => {
      setIsLoading(true);
      setError(null);
  
      try {
        if (!isConnected) {
          throw new Error("Wallet is not connected. Please connect your wallet.");
        }
  
        if (!walletClient) {
          throw new Error("No wallet client available.");
        }
  
        const contractAddress = import.meta.env.VITE_SOUNDLINK_CONTRACT_ADDRESS;
        if (!contractAddress) {
          throw new Error("Contract address is not set in environment variables.");
        }

        // Check if user has a profile first
        try {
          const result = await publicClient.readContract({
            address: contractAddress,
            abi: soundlinkABI,
            functionName: 'getUserProfile',
            args: [address]
          });
          console.log("User profile:", result);
        } catch (err) {
          throw new Error("Please create a profile before uploading beats");
        }
  
        // Convert price from ETH to Wei
        let priceInWei;
        try {
          priceInWei = parseEther(price.toString());
          if (priceInWei <= 0n) {
            throw new Error("Price must be greater than 0");
          }
        } catch (err) {
          throw new Error("Invalid price format. Please enter a valid number");
        }
  
        console.log("Preparing contract write with args:", {
          beatURI,
          coverURI,
          beatTitle,
          genre,
          priceInWei: priceInWei.toString()
        });
        
        const hash = await walletClient.writeContract({
          address: contractAddress,
          abi: soundlinkABI,
          functionName: 'uploadBeat',
          args: [beatURI, coverURI, beatTitle, genre, priceInWei]
        });
  
        console.log("Transaction hash:", hash);
  
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        console.log("Transaction receipt:", receipt);
  
        if (receipt.status === "reverted") {
          throw new Error("Transaction reverted. Make sure you have a profile and entered valid data.");
        }

        const newBeat = {
          beatId: uploadedBeats.length.toString(),
          owner: address,
          beatURI,
          coverURI,
          beatTitle,
          genre,
          price
        };
  
        setUploadedBeats((prevBeats) => [...prevBeats, newBeat]);
        return newBeat;
  
      } catch (err) {
        console.error("Error uploading beat:", err);
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isConnected, walletClient, publicClient, address, uploadedBeats]
  );
  
  return {
    uploadBeat,
    uploadedBeats,
    isLoading,
    error,
  };
};

export default useUploadBeats;