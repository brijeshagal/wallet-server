import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    twitterUserId: {
      type: String,
      required: true,
      index: true,
    },
    tweetId: {
      type: String,
      required: true,
      unique: true, // Ensure uniqueness for tweetId
      index: true,
    },
    assetType: {
      type: String,
      required: true,
      // enum: ["erc721", "erc1155", "erc20"], // Uncomment if needed
    },
    chainId: {
      type: Number,
      required: true,
    },
    contractAddress: {
      type: String,
      required: true,
    },
    nftId: {
      type: String,
      required: false,
    },
    tokenAmount: {
      type: Number,
      required: true,
    },
    tokenSymbol: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AssetModel = mongoose.model("Asset", assetSchema);

export { AssetModel };
