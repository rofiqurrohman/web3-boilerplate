export interface Chain {
  id: number;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: {
      http: string[];
    };
  };
}
export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
}

export interface Wallet {
  name: string;
  iconUrl: string;
  downloadUrls: {
    browserExtension?: string;
    appStore?: string;
    googlePlay?: string;
    qrCode?: string;
  };
}
