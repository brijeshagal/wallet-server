import { Router } from "express";
import { User } from "../database/schema/user";

const userDatabaseRouter = Router();

userDatabaseRouter.post("/exists/twitter/:twitterId", async (req, res) => {
  try {
    const twitterId = req.params.twitterId;

    // Validate request
    if (!twitterId) {
      res.status(400).json({ message: "Twitter ID is required" });
    }

    // Check if user exists
    const user = await User.findOne({ "twitter.id": twitterId });

    if (user) {
      res.status(200).json({ exists: true, user });
    } else {
      res.status(404).json({ exists: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

userDatabaseRouter.get("/twitter/:twitterId", async (req, res) => {
  try {
    const user = await User.findOne({ "twitter.id": req.params.twitterId });

    if (user) {
      res.status(200).json({ exists: true, user });
    } else {
      res.status(404).json({ exists: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

userDatabaseRouter.post("/add", async (req, res) => {
  try {
    const { uniqueId, twitterId, twitterUsername } = req.body;

    if (!uniqueId || !twitterId || !twitterUsername) {
      res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the Twitter ID already exists
    const existingUser = await User.findOne({ "twitter.id": twitterId });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      uniqueId,
      twitter: {
        id: twitterId,
        username: twitterUsername,
      },
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
