import "dotenv/config";
import { Keypair } from "@solana/web3.js";

// Parse the secret key from .env
const secretKeyString = process.env.SECRET_KEY!;
const secretKeyArray = secretKeyString
    .replace(/[\[\]"]/g, '')  // Remove brackets and quotes only
    .split(',')               // Split into array
    .map(number => parseInt(number)); // Convert to numbers

// Create keypair from secret key
const keypair = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));

console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);
console.log(`The public key is: ${keypair.publicKey.toBase58()}`);

  //9iU8gGBUDPjQEwDZjb2tcAG3YWR73M6a92y4oGJ9wLWP
