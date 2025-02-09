// import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// export const SUPPORTED_CHAIN_ID =[84532, 97, 11155111];


// const basesepolia = {
//   chainId: 84532,
//   name: "Base sepolia",
//   currency: "sepolia",
//   explorerUrl: "https://sepolia.basescan.org/",
//   rpcUrl: import.meta.env.VITE_RPC_URL,
// };

// const bnbchain = {
//     chainId: 97,
//     name: "BND Testnet",
//     currency: "tBNB",
//     explorerUrl: "https://testnet.bscscan.com/",
//     rpcUrl: import.meta.env.VITE_RPC_URL,
// };

// const sepolia = {
//     chainId: 97,
//     name: "BND Testnet",
//     currency: "tBNB",
//     explorerUrl: "https://testnet.bscscan.com/",
//     rpcUrl: import.meta.env.VITE_RPC_URL,
// };


// const metadata = {
//   name: "Strimz",
//   description: "A Token Streaming Application",
//   url: "http://localhost:5173/", // origin must match your domain & subdomain
//   icons: ["http://localhost:5173/"],
// };

// export const configWeb3Modal = () =>
//   createWeb3Modal({
//     ethersConfig: defaultConfig({ metadata }),
//     chains: [basesepolia, bnbchain, sepolia],
//     projectId: import.meta.env.VITE_PROJECT_ID,
//     enableAnalytics: false, // Optional - defaults to your Cloud configuration
//   });






//   import { createAppKit } from '@reown/appkit/react'
//   import {sepolia, opBNBTestnet } from '@reown/appkit/networks'
//   import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
  
//   import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

//   const projectId = '25eff117c155377330cc02421d6ff95c'
//   const queryClient = new QueryClient()
  
//   const metadata = { //optional
//       name: 'Soundlink',
//       description: 'Soundlink App for beats',
//       url: 'https://example.com',
//       icons: ['https://avatars.githubusercontent.com/u/179229932']
//   }
  
//   const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
//   /* Create the Wagmi adapter */
//   const wagmiAdapter = new WagmiAdapter({
//     networks: [sepolia, opBNBTestnet],
//     projectId
//   })
