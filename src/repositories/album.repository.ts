import { BaseRepository } from "./base/base.repository";
import Album, { IAlbum } from "../models/album.model";

export class AlbumRepository extends BaseRepository<IAlbum> {
  constructor() {
    super(Album);
  }
}
