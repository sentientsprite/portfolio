/**
 * crypto-wallet.ts — in-browser Bitcoin keypair demo powered by yours-bitcoin
 * (moneybutton/yours-bitcoin, MIT). https://github.com/moneybutton/yours-bitcoin
 *
 * The library + its crypto deps are lazy-loaded from esm.sh ONLY when the demo
 * runs, so they never touch the main site bundle. Everything happens client-side
 * — no funds, no network calls, no server. Generated keys are throwaway.
 */

const ESM_URL = 'https://esm.sh/yours-bitcoin@0.14.14';

let modPromise: Promise<Record<string, unknown>> | null = null;

/**
 * Indirect dynamic import so Vite/Rollup never rewrites it (a plain
 * `import(url)` triggers a `__VITE_PRELOAD__` injection that breaks at runtime).
 * This keeps the CDN load a pure browser-native dynamic import.
 */
const runtimeImport = new Function('u', 'return import(u);') as (
  u: string,
) => Promise<Record<string, unknown>>;

/** Lazy-load yours-bitcoin from the CDN (cached after first call). */
export function loadBitcoin(): Promise<Record<string, unknown>> {
  if (!modPromise) {
    modPromise = runtimeImport(ESM_URL).catch((err) => {
      modPromise = null;
      throw err;
    });
  }
  return modPromise;
}

export interface GeneratedWallet {
  wif: string;
  pubHex: string;
  address: string;
}

function bufToHex(buf: unknown): string {
  if (buf && typeof (buf as { toString: (e: string) => string }).toString === 'function') {
    try {
      return (buf as { toString: (e: string) => string }).toString('hex');
    } catch {
      /* fall through */
    }
  }
  return '';
}

/**
 * Generate a fresh random Bitcoin private key, then derive the matching
 * compressed public key and P2PKH address — all client-side via yours-bitcoin.
 */
export async function generateWallet(): Promise<GeneratedWallet> {
  const bsv = await loadBitcoin();
  const PrivKey = bsv.PrivKey as any;
  const PubKey = bsv.PubKey as any;
  const Address = bsv.Address as any;

  const privKey = PrivKey.fromRandom();
  const pubKey = PubKey.fromPrivKey(privKey);
  const address = Address.fromPubKey(pubKey);

  return {
    wif: typeof privKey.toWif === 'function' ? privKey.toWif() : String(privKey),
    pubHex: typeof pubKey.toHex === 'function' ? pubKey.toHex() : bufToHex(pubKey.toBuffer?.()),
    address: address.toString(),
  };
}
