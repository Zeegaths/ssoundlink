import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { WagmiProvider } from 'wagmi';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { createAppKit } from '@reown/appkit/react';
// import { sepolia, opBNBTestnet } from '@reown/appkit/networks';
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// Import components
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import MarketPlace from './pages/Marketplace';
import Matcher from './pages/Matcher';
import ProfileSetup from './components/ProfileSetup';
import RapBattles from './pages/RapBattles';
import AddBattle from './pages/AddBattle';
import BeatUploadForm from './pages/BeatUploadForm';
import CreateProfile from './components/CreateProfile';
import GlobalProvider from './context/Global/GlobalContext';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { 
  sepolia,
  opBNBTestnet
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

// Import styles
import './index.css';

const projectId = 'YOUR_PROJECT_ID' // Replace with your project ID

// App metadata
const metadata = {
  name: 'RapBattle App',
  description: 'A platform for rap battles and beat marketplace',
  url: 'https://your-app-url.com',
  icons: ['https://your-app-icon-url.com']
}


const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia,
    opBNBTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
// Create router
const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/profile-setup", element: <ProfileSetup /> },
  { path: "/feed", element: <Feed /> },
  { path: "/beats-market", element: <MarketPlace /> },
  { path: "/match-beats", element: <Matcher /> },
  { path: "/rap-battles", element: <RapBattles /> },
  { path: "/add-battle", element: <AddBattle /> },
  { path: "/beat-upload", element: <BeatUploadForm /> },
  { path: "/create-profile", element: <CreateProfile /> },
]);

// Create Query Client
const queryClient = new QueryClient();

// Main App Component
const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <GlobalProvider>
          <RouterProvider router={router} />
        </GlobalProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};



export default App;