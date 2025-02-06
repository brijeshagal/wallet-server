import { Router } from "express";
import { AssetModel } from "../../database/schema/tweets";
import { UserModel } from "../../database/schema/user";
import { Actions } from "../../enums/actions";
import NotificationService from "../../notification/NotificationService";

const twitterAgentRouter = Router();

twitterAgentRouter.post("/register-tweet", async (req, res) => {
  try {
    const {
      twitterUserId,
      tweetId,
      assetType,
      chainId,
      contractAddress,
      nftId,
      tokenAmount,
      tokenSymbol,
    } = req.body;

    // Validate required fields
    if (
      !twitterUserId ||
      !tweetId ||
      !assetType ||
      !chainId ||
      !contractAddress ||
      !tokenAmount ||
      !tokenSymbol
    ) {
      res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new asset entry
    const newAsset = new AssetModel({
      twitterUserId,
      tweetId,
      assetType,
      chainId,
      contractAddress,
      nftId,
      tokenAmount,
      tokenSymbol,
    });

    await newAsset.save();

    res
      .status(201)
      .json({ message: "Asset added successfully", asset: newAsset });
  } catch (error: any) {
    console.error("Error adding asset:", error);

    // Check for duplicate tweetId (unique constraint)
    if (error.code === 11000) {
      res.status(409).json({ error: "Tweet ID already exists" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});
twitterAgentRouter.post("/notify-user", async (req, res) => {
  try {
    const { twitterUserId, tweetId } = req.body;

    // Validate request
    if (!twitterUserId) {
      res.status(400).json({ message: "Twitter ID is required" });
    }

    // Check if user exists
    const user = await UserModel.findOne({ "twitter.id": twitterUserId });
    
    if (user) {
      const tweetDetails = await AssetModel.findOne({ "twitter.id": tweetId });
      if (tweetDetails) {
        const isUserNotified = await NotificationService.sendPushNotification({
          // @TODO update body and title based on type of asset
          title: "Buy the NFT",
          body: "Buy the NFT",
          expoPushToken: user.expoToken[0], // @TODO checkout later to send notification to all logged in devices
          data: {
            screenRoute: "/actions/buyNft",
            backRoute: "/(tabs)",
            type: Actions.Buy,
            fromToken: {
              assets: {
                symbol: tweetDetails.tokenSymbol,
                chainId: tweetDetails.chainId,
                address: tweetDetails.contractAddress,
              },
              amount: tweetDetails.tokenAmount,
              nftId: tweetDetails.nftId,
            },
            toToken: {
              assets: {
                symbol: tweetDetails.tokenSymbol,
                chainId: tweetDetails.chainId,
                address: tweetDetails.contractAddress,
              },
              amount: tweetDetails.tokenAmount,
              nftId: tweetDetails.nftId,
            },
          },
        });
        res
          .status(200)
          .json({ exists: true, user, userNotified: isUserNotified });
      } else {
        res.status(404).json({ exists: false, message: "User not found" });
      }
    } else {
      res.status(404).json({ exists: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default twitterAgentRouter;
