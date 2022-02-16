import { BaseRepository } from "./base/base.repository";
import Album, { IAlbum } from "../models/album.model";
import { Service } from "typedi";

@Service()
export class AlbumRepository extends BaseRepository<IAlbum> {
  constructor() {
    super(Album);
  }
}
