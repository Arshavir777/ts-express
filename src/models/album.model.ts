import { Model, model, Schema } from "mongoose";

/**
 * Interface to model the Album Schema for TypeScript.
 * @param ownerId:ObjectId
 * @param title:string
 */
export interface IAlbum {
  ownerId: Schema.Types.ObjectId;
  albumId: number;
  title: string;
}

const albumSchema: Schema = new Schema(
  {
    ownerId: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    albumId: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  { versionKey: false }
);

const Album: Model<IAlbum> = model("Album", albumSchema);

export default Album;
