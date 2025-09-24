import axios from "axios";
import { Product } from "../ts/Product";
const URL = "http://localhost:5000";

async function getProducts(): Promise<Product[]> {
  const response = await axios.get<Product[]>(`${URL}/products`);

  return response.data;
}

export const api = {
  getProducts,
};
