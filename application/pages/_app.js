import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

// This is the chain your dApp will work on.
const activeChain = "goerli";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
