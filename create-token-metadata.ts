import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
  } from "@solana-developers/helpers";
  import {
    Connection,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
  } from "@solana/web3.js";import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const connection = new Connection("http://127.0.0.1:8899", "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

const tokenMintAccount = new PublicKey("FU1guDL1VfrCqYu9Uvo2b7WscvfumX9JZ61CmEmZ3pai");

const metadataData = {
  name: "Solana Training Token",
  symbol: "TRAINING",
  // Arweave / IPFS / Pinata etc link using metaplex standard for offchain data
  uri: "https://arweave.net/1234",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

 
const metadataPDAAndBump = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID,
);



const metadataPDA = metadataPDAAndBump[0];
const transaction = new Transaction();

const createMetadataAccountInstruction =
  createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: user.publicKey,
      payer: user.publicKey,
      updateAuthority: user.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    },
  );
 
  transaction.add(createMetadataAccountInstruction);


  const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user],
  );

  console.log("transactionSignature:", transactionSignature);

console.log("tokenMintAddress: ",tokenMintAccount.toString());


// token mint FU1guDL1VfrCqYu9Uvo2b7WscvfumX9JZ61CmEmZ3pai