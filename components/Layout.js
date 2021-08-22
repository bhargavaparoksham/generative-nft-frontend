import Head from "next/head"; // Head + meta
import Link from "next/link"; // Routing
import state from "../utils/state"; // Global state
import NextNProgress from "nextjs-progressbar"; // Navigation progress bar
import styles from "../styles/components/Layout.module.scss"; // Component styles
import Jazzicon, { jsNumberForAddress } from "react-jazzicon"; // Address avatar

export default function Layout({ children }) {
  return (
    <div>
      {/* Navigation progress bar */}
      <NextNProgress
        color="#282846"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{
          showSpinner: false,
        }}
      />

      {/* HTML Meta + Header */}
      <Meta />
      <Header />
      <div className={styles.layout__content}>{children}</div>

    </div>
  );
}

// HTML Head
function Meta() {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>Generative NFT Lottery</title>
      <meta name="title" content="Generative NFT Lottery" />
      <meta
        name="description"
        content="Generative NFT lottery is an NFT smart contract where each NFT you buy will act as a lottery ticket. Once all 10k NFTs are sold, 10 lucky winners will be selected at random & the prize pool is distributed to them automatically."
      />
      {/* Google fonts */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}

// Header (+ auth management)
function Header() {
  // Collect address and unlock function from global state
  const { address, unlock } = state.useContainer();

  return (
    <div className={styles.layout__header}>
      <div className="sizer">
        {/* Logo */}
        <div>
          <Link href="/">
            <a>
             <img src="logo.png" alt="logo" height="50" width="50" />
            </a>
          </Link>
        </div> 

        {/* Auth button */}
        <div>
          <button onClick={unlock}>
            {address ? (
              // If authenticated
              <>
                {/* Render address */}
                <span>
                  {address.startsWith("0x")
                    ? // If ETH address, render truncated address
                      address.substr(0, 6) +
                      "..." +
                      address.slice(address.length - 4)
                    : // Else, render ENS name
                      address}
                </span>
                {/* Render avatar */}
                <Jazzicon diameter={16} seed={jsNumberForAddress(address)} />
              </>
            ) : (
              // Else, display Connect Wallet prompt
              "Connect Wallet"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

