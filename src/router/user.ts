import { Router } from "express";
import { UserModel } from "../database/schema/user";

const userDatabaseRouter = Router();

userDatabaseRouter.post("/exists/twitter/:twitterId", async (req, res) => {
  try {
    const twitterId = req.params.twitterId;

    // Validate request
    if (!twitterId) {
      res.status(400).json({ message: "Twitter ID is required" });
    }

    // Check if user exists
    const user = await UserModel.findOne({ "twitter.id": twitterId });

    if (user) {
      res.status(200).json({ exists: true, user });
    } else {
      res.status(404).json({ exists: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

userDatabaseRouter.get("/add/twitter/:twitterId", async (req, res) => {
  const { userId, twitterUserId, twitterUsername } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId, // Find user by their uniqueId
      {
        $set: {
          "twitter.id": twitterUserId,
          "twitter.username": twitterUsername,
        },
      },
      { new: true } // Return updated user
    );

    if (user) {
      console.log("✅ Twitter info updated:", user);
      res.status(200);
    } else {
      console.log("❌ No user found with ID:", userId);
      res.status(300).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("❌ Error updating Twitter info:", error);
    res.status(400);
  }
});

userDatabaseRouter.post("/add", async (req, res) => {
  try {
    const { userId, twitterId, twitterUsername, addresses, expoToken } =
      req.body;

    if (!userId || !twitterId || !twitterUsername) {
      res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the Twitter ID already exists
    const existingUser = await UserModel.findOne({ uniqueId: userId });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new UserModel({
      uniqueId: userId,
      twitter: {
        id: twitterId,
        username: twitterUsername,
      },
      addresses,
      expoToken: [expoToken],
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default userDatabaseRouter;
