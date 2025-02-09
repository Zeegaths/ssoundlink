import { ethers } from "ethers";
import SOUNDLINKCONTRACT from '../abis/Soundlink.json'


export const getSoundlinkContract = (providerOrSigner) => {
  return new ethers.Contract(
    import.meta.env.VITE_SOUNDLINK_CONTRACT_ADDRESS,
    SOUNDLINKCONTRACT,
    providerOrSigner
  );
};


