import { SUPPORTED_CHAIN_ID } from "../connection";

export const isSupportedChain = (chainId) =>
    chainId !== undefined && Number(chainId) === SUPPORTED_CHAIN_ID;