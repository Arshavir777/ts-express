import mongoose from "mongoose";
import Container, { Service } from "typedi";
import { config } from "../config";

@Service()
class MongoDataSource {
  constructor() {}

  async connect(): Promise<void> {
    try {
      console.log({uri: config});
      
      await mongoose.connect(config.mongoDbUri);
      console.log("MongoDB connected");
    } catch (error) {
      console.log("MongoDB connection error: ", error.message);
      throw error;
    }
  }
}

export default Container.get(MongoDataSource)
