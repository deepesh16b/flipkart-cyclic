import { productsData } from "./constants/products-data.js";
import Product from "./model/product-schema.js";

const DefaultData = async () => {
  try {
    await Product.insertMany(productsData);
  } catch (error) {
    console.log(error.message);
  }
};

export default DefaultData;