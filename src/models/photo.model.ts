import { Model, model, Schema } from "mongoose";

/**
 * Interface to model the Photo Schema for TypeScript.
 * @param albumId:ObjectId
 * @param title:string
 * @param url:string
 * @param thumbnailUrl:string
 * @param ownerId:ObjectId
 */
export interface IPhoto {
  albumId: string | number;
  title: string;
  url: string;
  thumbnailUrl: string;
  ownerId: Schema.Types.ObjectId;
}

export type TJpPhoto = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const photoSchema: Schema = new Schema<IPhoto>(
  {
    albumId: {
      type: Number,
      ref: "Album",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false }
);

const Photo: Model<IPhoto> = model("Photo", photoSchema);

export default Photo;
