import axios, { Axios } from "axios";
import { TJpPhoto } from "../models/photo.model";
import { config } from "../config";
import { Service } from "typedi";

@Service()
class JpService {
  private $client: Axios;
  constructor() {
    this.$client = axios.create({
      baseURL: config.jpApiBase,
      timeout: 3000,
    });
  }

  async fetchPhotos(options: any = { limit: 100 }): Promise<TJpPhoto[]> {
    try {
      const { data } = await this.$client.get("/photos");
      if (options?.limit) {
        return data.slice(0, options.limit);
      }
      return data;
    } catch (error) {
      return null;
    }
  }
}

export default new JpService();
