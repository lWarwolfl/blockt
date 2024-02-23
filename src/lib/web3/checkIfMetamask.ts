import type { MetaMaskInpageProvider } from "@metamask/providers";
import toast from "react-hot-toast";

export const checkIfMetamask = () => {
  const ethereum = global?.window?.ethereum;
  if (!ethereum || !ethereum.isMetaMask) toast.error("MetaMask not installed");
  return ethereum as unknown as MetaMaskInpageProvider;
};