import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Album Schema for TypeScript.
 * @param ownerId:ObjectId
 * @param title:string
 */
export interface IAlbum {
  ownerId: string;
  title: string;
}

const albumSchema: Schema = new Schema({
  ownerId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
});

const Album: Model<IAlbum> = model("Album", albumSchema);

export default Album;
