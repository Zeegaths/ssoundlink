import { PinataSDK } from "pinata";

export const pinata = new PinataSDK ({
    pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YTM3MGM1Ni1lZDNkLTQ3NTEtOTQxZS04MTI3N2ZmMzQ2MTUiLCJlbWFpbCI6InphcmFoZ2F0aG9uaTc2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhOTNjY2M3NTMyNzM0MmVkYTRiNSIsInNjb3BlZEtleVNlY3JldCI6IjQzOTk0YTY3NWM5MmJlYWMyOWFhZjA0OTk0OTNjMzBkYTYzNGJmY2Y0NDQ5NWQyOWFhYWRlNjY3YzI3MGZiYjAiLCJleHAiOjE3NjgwNDMxNDl9.8Z6DstX57Mw4Sbm2eZz96YPvFdFjND5RR4EmuOKCDog",
    pinataGateway: "amber-central-eagle-578.mypinata.cloud"
})


import { http, createConfig } from 'wagmi'
import { opBNBTestnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [opBNBTestnet, sepolia],
  transports: {
    [opBNBTestnet.id]: http(),
    [sepolia.id]: http(),
  },
})