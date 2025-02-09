import { ethers } from "ethers";

// When wallet is not connected, connects to the Sepolia RPC
export const readOnlyProvider = new ethers.JsonRpcProvider(
  import.meta.env.VITE_RPC_URL
);

// For WebSocket connections
// export const wssProvider = new ethers.WebSocketProvider(
//   import.meta.env.VITE_WEB_SOCKET_RPC_URL
// );

// For browser wallet connections (MetaMask etc.)
export const getProvider = (walletProvider) => 
  new ethers.BrowserProvider(walletProvider);