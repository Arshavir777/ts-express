import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Photo Schema for TypeScript.
 * @param albumId:ObjectId
 * @param title:string
 * @param url:string
 * @param thumbnailUrl:string
 * @param ownerId:ObjectId
 */
export interface TPhoto {
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  ownerId: string;
}

const photoSchema: Schema = new Schema({
  albumId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
});

const Photo: Model<TPhoto> = model("Photo", photoSchema);

export default Photo;
