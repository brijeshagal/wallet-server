const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      required: true,
      unique: true, // Ensuring each user has a unique identifier
    },
    twitter: {
      id: {
        type: String,
        required: true,
        unique: true, // Ensuring Twitter ID is unique
      },
      username: {
        type: String,
        required: true,
      },
    },
    addresses: {
      type: Map, // Allows dynamic blockchain types (evm, svm, bvm, etc.)
      of: [String], // Each key holds an array of address strings
      default: {}, // Initialize as an empty object
    },
    expoToken: {
      type: [String], // Array of Expo push notification tokens
      default: [],
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt

const User = mongoose.model("User", userSchema);

export { User };
