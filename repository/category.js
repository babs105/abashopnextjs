import Category from "../models/category";
import dbConnect from "./connectMongo";

export const categoryRepo = {
  getAllCategory,
  getCategoryById,
};

async function getAllCategory() {
  try {
    await dbConnect();
    const categories = await Category.find({});

    if (categories) return categories;
  } catch (error) {
    console.log("error db", error);
  }
}
async function getCategoryById(id) {
  try {
    await dbConnect();
    const category = await Category.findOne({ _id: id });

    if (category) return category;
  } catch (error) {
    console.log("error db", error);
  }
}
