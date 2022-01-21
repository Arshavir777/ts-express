import mongoose from "mongoose";
import { config } from "../config";

class MongoDataSource {
  constructor() {}

  async connect(): Promise<void> {
    try {
      await mongoose.connect(config.mongoDbUri);
      console.log("MongoDB connected");
    } catch (error) {
      console.log("MongoDB connection error: ", error.message);
      throw error;
    }
  }
}

export default new MongoDataSource();
