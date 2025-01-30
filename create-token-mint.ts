import { createMint } from "@solana/spl-token";
import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection } from "@solana/web3.js";

// Change this line to use localhost
const connection = new Connection("http://127.0.0.1:8899", "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const tokenMint = await createMint(connection, user, user.publicKey, null, 2);
// Note: getExplorerLink won't work with localhost, so let's modify the console output
console.log(`✅ Finished! Created token mint: ${tokenMint.toString()}`);