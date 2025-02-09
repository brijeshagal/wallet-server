import mongoose from "mongoose";

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
        unique: true,
      },
      username: {
        type: String,
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

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
